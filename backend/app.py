from flask import Flask, jsonify
from flask_cors import CORS

from db import get_connection

app = Flask(__name__)
# CORS(app) use it only for test purpose
CORS(
    app,
    origins = [
        "https://portfolio-v2-mocha-nu.vercel.app"
    ]
)

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/projects")
def get_projects():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title, description, github_url, tech_stack FROM projects;")
    rows = cur.fetchall()

    projects = [
        {
            "id": r[0],
            "title": r[1],
            "description": r[2],
            "github_url": r[3],
            "tech_stack": r[4]
        }
        for r in rows
    ]

    cur.close()
    conn.close()

    return jsonify(projects)

@app.route("/api/certificates")
def get_certificates():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title, issuer, credential_url FROM certificates;")
    rows = cur.fetchall()

    certs = [
        {
            "id": r[0],
            "title": r[1],
            "issuer": r[2],
            "credential_url": r[3],
            "badge_image": r[4]
        }
        for r in rows
    ]

    cur.close()
    conn.close()

    return jsonify(certs)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)