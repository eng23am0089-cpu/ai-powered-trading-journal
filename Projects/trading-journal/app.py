

from flask_cors import CORS
import jwt
import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_bcrypt import Bcrypt
import psycopg2


app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "trading_journal_secret_key_2026_super_secure_key"

bcrypt = Bcrypt(app)

# Database Connection

conn = psycopg2.connect(
    host="localhost",
    port="54321",
    database="trading_journal",
    user="postgres",
    password="vivektm1332005"
)

cursor = conn.cursor()

# Home Route

@app.route("/")
def home():
    return {
        "message": "Trading Journal API Running Successfully"
    }

# Signup Route

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    cursor.execute(
        """
        INSERT INTO users (username, email, password)
        VALUES (%s, %s, %s)
        """,
        (username, email, hashed_password)
    )

    conn.commit()

    return jsonify({
        "message": "User Registered Successfully"
    })


# Login Route

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data["email"]
    password = data["password"]

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    stored_password = user[3]

    if bcrypt.check_password_hash(stored_password, password):
        token = jwt.encode(
            {
                "user_id": user[0],
                "email": user[2],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            },
            app.config["SECRET_KEY"],
            algorithm="HS256"
        )

        return jsonify({
            "message": "Login Successful",
            "token": token
        })

    return jsonify({
        "message": "Invalid Password"
    }), 401


# Profile Route

@app.route("/profile", methods=["GET"])
def profile():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:
        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        return jsonify({
            "user_id": data["user_id"],
            "email": data["email"]
        })

    except Exception:
        return jsonify({
            "message": "Invalid Token"
        }), 401


# Add Trade Route

@app.route("/add-trade", methods=["POST"])
def add_trade():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        trade = request.get_json()

        entry_price = float(trade["entry_price"])
        exit_price = float(trade["exit_price"])
        lot_size = float(trade["lot_size"])

        # Automatic PnL Calculation

        if trade["side"].lower() == "buy":
            pnl = (exit_price - entry_price) * lot_size

        else:
            pnl = (entry_price - exit_price) * lot_size

        cursor.execute(
            """
            INSERT INTO trades
            (
                user_id,
                trade_date,
                symbol,
                side,
                entry_price,
                exit_price,
                stop_loss,
                take_profit,
                lot_size,
                pnl,
                notes
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                user_id,
                trade["trade_date"],
                trade["symbol"],
                trade["side"],
                entry_price,
                exit_price,
                float(trade["stop_loss"]),
                float(trade["take_profit"]),
                lot_size,
                pnl,
                trade["notes"]
            )
        )

        conn.commit()

        return jsonify({
            "message": "Trade Added Successfully",
            "pnl": pnl
        })

    except Exception as e:
        conn.rollback()

        import traceback
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500


# Get All Trades Route
# Get All Trades Route


@app.route("/add-journal", methods=["POST"])
def add_journal():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"message": "Token Missing"}), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        journal = request.get_json()

        cursor.execute(
            """
            INSERT INTO journals
            (
                user_id,
                journal_date,
                emotion,
                mistakes,
                lessons,
                tomorrow_plan
            )
            VALUES (%s,%s,%s,%s,%s,%s)
            """,
            (
                user_id,
                journal["journal_date"],
                journal["emotion"],
                journal["mistakes"],
                journal["lessons"],
                journal["tomorrow_plan"]
            )
        )

        conn.commit()

        return jsonify({
            "message": "Journal Saved Successfully"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "error": str(e)
        }), 500

@app.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory(
        "uploads",
        filename
    )





    
@app.route("/journals", methods=["GET"])
def get_journals():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"message": "Token Missing"}), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        cursor.execute(
            """
            SELECT *
            FROM journals
            WHERE user_id=%s
            ORDER BY journal_date DESC
            """,
            (user_id,)
        )

        journals = cursor.fetchall()

        result = []

        for journal in journals:

            result.append({

    "id": journal[0],

    "date": str(journal[2]),

    "emotion": journal[3],

    "mistakes": journal[4],

    "lessons": journal[5],

    "tomorrow_plan": journal[6],

   




            })

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
    
@app.route("/trades", methods=["GET"])
def get_trades():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:
        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        cursor.execute(
            """
            SELECT *
            FROM trades
            WHERE user_id = %s
            ORDER BY trade_date DESC
            """,
            (user_id,)
        )

        trades = cursor.fetchall()

        result = []

        for trade in trades:
            result.append({
                "id": trade[0],
                "user_id": trade[1],
                "trade_date": str(trade[2]),
                "symbol": trade[3],
                "side": trade[4],
                "entry_price": float(trade[5]),
                "exit_price": float(trade[6]),
                "stop_loss": float(trade[7]),
                "take_profit": float(trade[8]),
                "lot_size": float(trade[9]),
                "pnl": float(trade[10]),
                "notes": trade[11]
            })

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

# Update Trade Route
# Update Trade Route

@app.route("/change-password", methods=["PUT"])
def change_password():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"message": "Token Missing"}), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        body = request.get_json()

        current_password = body["current_password"]
        new_password = body["new_password"]

        cursor.execute(
            "SELECT password FROM users WHERE id=%s",
            (user_id,)
        )

        stored_password = cursor.fetchone()[0]

        if not bcrypt.check_password_hash(
            stored_password,
            current_password
        ):
            return jsonify({
                "message": "Current password incorrect"
            }), 401

        hashed_password = bcrypt.generate_password_hash(
            new_password
        ).decode("utf-8")

        cursor.execute(
            """
            UPDATE users
            SET password=%s
            WHERE id=%s
            """,
            (
                hashed_password,
                user_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Password Changed Successfully"
        })

    except Exception as e:

        conn.rollback()

        return jsonify({
            "error": str(e)
        }), 500


@app.route("/calendar-data", methods=["GET"])
def calendar_data():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"message":"Token Missing"}),401

    token = auth_header.split(" ")[1]

    data = jwt.decode(
        token,
        app.config["SECRET_KEY"],
        algorithms=["HS256"]
    )

    user_id = data["user_id"]

    cursor.execute(
        """
        SELECT
            trade_date,
            SUM(pnl)
        FROM trades
        WHERE user_id=%s
        GROUP BY trade_date
        ORDER BY trade_date
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    result = []

    for row in rows:

        result.append({

            "date": str(row[0]),
            "pnl": float(row[1])

        })

    return jsonify(result)
@app.route("/trade/<int:trade_id>", methods=["PUT"])
def update_trade(trade_id):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        trade = request.get_json()

        cursor.execute(
            """
            UPDATE trades
            SET
                trade_date=%s,
                symbol=%s,
                side=%s,
                entry_price=%s,
                exit_price=%s,
                stop_loss=%s,
                take_profit=%s,
                lot_size=%s,
                pnl=%s,
                notes=%s
            WHERE id=%s
            AND user_id=%s
            """,
            (
                trade["trade_date"],
                trade["symbol"],
                trade["side"],
                trade["entry_price"],
                trade["exit_price"],
                trade["stop_loss"],
                trade["take_profit"],
                trade["lot_size"],
                trade["pnl"],
                trade["notes"],
                trade_id,
                user_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Trade Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
# Delete Trade Route

@app.route("/trade/<int:trade_id>", methods=["DELETE"])
def delete_trade(trade_id):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        cursor.execute(
            """
            DELETE FROM trades
            WHERE id = %s
            AND user_id = %s
            """,
            (trade_id, user_id)
        )

        conn.commit()

        return jsonify({
            "message": "Trade Deleted Successfully"
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "error": str(e)
        }), 500
# Dashboard Stats Route

@app.route("/stats", methods=["GET"])
def stats():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Token Missing"
        }), 401

    try:

        token = auth_header.split(" ")[1]

        data = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=["HS256"]
        )

        user_id = data["user_id"]

        # Total Trades
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM trades
            WHERE user_id=%s
            """,
            (user_id,)
        )

        total_trades = cursor.fetchone()[0]

        # Total PnL
        cursor.execute(
            """
            SELECT COALESCE(SUM(pnl),0)
            FROM trades
            WHERE user_id=%s
            """,
            (user_id,)
        )

        total_pnl = float(cursor.fetchone()[0])

        # Winning Trades
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM trades
            WHERE user_id=%s
            AND pnl > 0
            """,
            (user_id,)
        )

        winning_trades = cursor.fetchone()[0]

        # Losing Trades
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM trades
            WHERE user_id=%s
            AND pnl < 0
            """,
            (user_id,)
        )

        losing_trades = cursor.fetchone()[0]

        # Win Rate
        win_rate = 0

        if total_trades > 0:

            win_rate = round(
                (winning_trades / total_trades) * 100,
                2
            )

        # Best Trade
        cursor.execute(
            """
            SELECT COALESCE(MAX(pnl),0)
            FROM trades
            WHERE user_id=%s
            """,
            (user_id,)
        )

        best_trade = float(cursor.fetchone()[0])

        # Worst Trade
        cursor.execute(
            """
            SELECT COALESCE(MIN(pnl),0)
            FROM trades
            WHERE user_id=%s
            """,
            (user_id,)
        )

        worst_trade = float(cursor.fetchone()[0])

        # Monthly Performance
        cursor.execute(
            """
            SELECT COALESCE(SUM(pnl),0)
            FROM trades
            WHERE user_id=%s
            AND DATE_TRUNC('month', trade_date)=DATE_TRUNC('month', CURRENT_DATE)
            """,
            (user_id,)
        )

        monthly_pnl = float(cursor.fetchone()[0])

        # Trading Streak
        trading_streak = winning_trades

        return jsonify({

            "total_trades": total_trades,

            "total_pnl": total_pnl,

            "winning_trades": winning_trades,

            "losing_trades": losing_trades,

            "win_rate": win_rate,

            "best_trade": best_trade,

            "worst_trade": worst_trade,

            "monthly_pnl": monthly_pnl,

            "trading_streak": trading_streak

        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500
# Test Rou

@app.route("/test")
def test():
    return {
        "message": "TEST ROUTE WORKING"
    }


if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=5000,
    debug=True
)
