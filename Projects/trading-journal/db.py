import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        port="54321",
        database="trading_journal",
        user="postgres",
        password="vivektm1332005"
    )

    print("Database Connected Successfully")

except Exception as e:
    print("Connection Error:", e)