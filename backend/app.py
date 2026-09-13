
from fastapi import FastAPI, HTTPException
from pathlib import Path
import pandas as pd
import joblib

app = FastAPI(
    title="SmartFactory Risk Intelligence API",
    description="Backend API for SmartFactory ML risk analysis",
    version="1.0.0"
)

BASE_DIR = Path(__file__).resolve().parent


# ============================================================
# LOAD DATA
# ============================================================

def load_csv(filename):
    path = BASE_DIR / filename

    if not path.exists():
        return None

    return pd.read_csv(path)


plant_risk = load_csv("final_plant_risk.csv")
supplier_predictions = load_csv(
    "supplier_predictions.csv"
)
bottleneck_predictions = load_csv(
    "production_bottleneck_predictions.csv"
)
plant_bottleneck_summary = load_csv(
    "plant_bottleneck_summary.csv"
)
plant_oee = load_csv(
    "plant_oee_analysis.csv"
)
worst_oee_lines = load_csv(
    "worst_oee_lines.csv"
)
downtime_pareto = load_csv(
    "downtime_pareto.csv"
)


# ============================================================
# LOAD ML MODELS
# ============================================================

def load_model(filename):
    path = BASE_DIR / filename

    if not path.exists():
        return None

    return joblib.load(path)


bottleneck_model = load_model(
    "bottleneck_risk_model.joblib"
)

supplier_high_risk_model = load_model(
    "supplier_high_risk_model.joblib"
)

supplier_risk_model = load_model(
    "supplier_risk_classification_model.joblib"
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():
    return {
        "service": "SmartFactory Risk Intelligence API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy",

        "models": {
            "bottleneck_model":
                bottleneck_model is not None,

            "supplier_high_risk_model":
                supplier_high_risk_model is not None,

            "supplier_risk_model":
                supplier_risk_model is not None
        },

        "datasets": {
            "plant_risk":
                plant_risk is not None,

            "supplier_predictions":
                supplier_predictions is not None,

            "bottleneck_predictions":
                bottleneck_predictions is not None
        }
    }


# ============================================================
# EXECUTIVE SUMMARY
# ============================================================

@app.get("/api/summary")
def summary():

    if plant_risk is None:
        raise HTTPException(
            status_code=500,
            detail="Plant risk dataset not available"
        )

    return {
        "total_plants":
            int(plant_risk["plant_id"].nunique()),

        "critical_plants":
            int(
                (plant_risk["Disruption_Level"] == "Critical")
                .sum()
            ),

        "high_risk_plants":
            int(
                (plant_risk["Disruption_Level"] == "High")
                .sum()
            ),

        "medium_risk_plants":
            int(
                (plant_risk["Disruption_Level"] == "Medium")
                .sum()
            ),

        "average_oee":
            float(plant_risk["Avg_OEE"].mean()),

        "average_bottleneck_risk":
            float(
                plant_risk["Avg_Bottleneck_Risk"].mean()
            ),

        "total_expected_downtime_exposure":
            float(
                plant_risk[
                    "Expected_Downtime_Exposure"
                ].sum()
            ),

        "highest_priority_plant":
            str(
                plant_risk.sort_values(
                    "Priority_Score",
                    ascending=False
                ).iloc[0]["plant_id"]
            )
    }


# ============================================================
# PLANT ENDPOINTS
# ============================================================

@app.get("/api/plants")
def get_plants():

    if plant_risk is None:
        raise HTTPException(
            status_code=500,
            detail="Plant dataset unavailable"
        )

    data = plant_risk.sort_values(
        "Priority_Score",
        ascending=False
    )

    return data.to_dict(orient="records")


@app.get("/api/plants/{plant_id}")
def get_plant(plant_id: str):

    if plant_risk is None:
        raise HTTPException(
            status_code=500,
            detail="Plant dataset unavailable"
        )

    result = plant_risk[
        plant_risk["plant_id"] == plant_id
    ]

    if result.empty:
        raise HTTPException(
            status_code=404,
            detail=f"Plant {plant_id} not found"
        )

    return result.iloc[0].to_dict()


# ============================================================
# SUPPLIER ENDPOINTS
# ============================================================

@app.get("/api/suppliers")
def get_suppliers():

    if supplier_predictions is None:
        raise HTTPException(
            status_code=500,
            detail="Supplier dataset unavailable"
        )

    data = supplier_predictions.copy()

    if "Supplier_High_Risk_Probability" in data.columns:
        data = data.sort_values(
            "Supplier_High_Risk_Probability",
            ascending=False
        )

    return data.to_dict(orient="records")


@app.get("/api/suppliers/top")
def get_top_suppliers(limit: int = 10):

    if supplier_predictions is None:
        raise HTTPException(
            status_code=500,
            detail="Supplier dataset unavailable"
        )

    data = supplier_predictions.copy()

    if "Supplier_High_Risk_Probability" in data.columns:
        data = data.sort_values(
            "Supplier_High_Risk_Probability",
            ascending=False
        )

    return data.head(limit).to_dict(
        orient="records"
    )


# ============================================================
# BOTTLENECK ENDPOINTS
# ============================================================

@app.get("/api/bottlenecks")
def get_bottlenecks():

    if bottleneck_predictions is None:
        raise HTTPException(
            status_code=500,
            detail="Bottleneck dataset unavailable"
        )

    data = bottleneck_predictions.copy()

    if "Bottleneck_Risk_Probability" in data.columns:
        data = data.sort_values(
            "Bottleneck_Risk_Probability",
            ascending=False
        )

    return data.to_dict(orient="records")


@app.get("/api/bottlenecks/top")
def get_top_bottlenecks(limit: int = 20):

    if bottleneck_predictions is None:
        raise HTTPException(
            status_code=500,
            detail="Bottleneck dataset unavailable"
        )

    data = bottleneck_predictions.copy()

    if "Bottleneck_Risk_Probability" in data.columns:
        data = data.sort_values(
            "Bottleneck_Risk_Probability",
            ascending=False
        )

    return data.head(limit).to_dict(
        orient="records"
    )


# ============================================================
# OEE ENDPOINTS
# ============================================================

@app.get("/api/oee")
def get_oee():

    if plant_oee is None:
        raise HTTPException(
            status_code=404,
            detail="OEE dataset unavailable"
        )

    return plant_oee.to_dict(
        orient="records"
    )


@app.get("/api/oee/worst-lines")
def get_worst_oee_lines():

    if worst_oee_lines is None:
        raise HTTPException(
            status_code=404,
            detail="Worst OEE dataset unavailable"
        )

    return worst_oee_lines.to_dict(
        orient="records"
    )


# ============================================================
# DOWNTIME ENDPOINT
# ============================================================

@app.get("/api/downtime")
def get_downtime():

    if downtime_pareto is None:
        raise HTTPException(
            status_code=404,
            detail="Downtime dataset unavailable"
        )

    return downtime_pareto.to_dict(
        orient="records"
    )


# ============================================================
# PLANT RECOMMENDATIONS
# ============================================================

@app.get("/api/recommendations")
def get_recommendations():

    if plant_risk is None:
        raise HTTPException(
            status_code=500,
            detail="Plant risk dataset unavailable"
        )

    columns = [
        "plant_id",
        "Disruption_Level",
        "Priority_Score",
        "Recommendation"
    ]

    available = [
        c for c in columns
        if c in plant_risk.columns
    ]

    result = plant_risk[available].sort_values(
        "Priority_Score",
        ascending=False
    )

    return result.to_dict(
        orient="records"
    )
