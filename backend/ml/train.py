import os
import pandas as pd
import joblib

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sklearn.linear_model import LinearRegression

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

print("Mengambil data...")

query = """
SELECT
    sales_date,
    sales_qty
FROM sales_history
WHERE tenant_id =: tenant_id
AND drug_code = 'M01AB'
ORDER BY sales_date
"""

df = pd.read_sql(query, engine)

print("Jumlah data:", len(df))

df["sales_date"] = pd.to_datetime(df["sales_date"])

# ubah tanggal jadi angka urut
df["day_number"] = range(len(df))

X = df[["day_number"]]
y = df["sales_qty"]

print("Training model...")

model = LinearRegression()

model.fit(X, y)

os.makedirs("ml/models", exist_ok=True)

joblib.dump(
    model,
    "ml/models/m01ab_t001.pkl"
)

print("Model berhasil disimpan")