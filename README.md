# 🚀 k6 Performance Testing Project

Welcome to the k6 Performance Testing repository! This project contains a comprehensive suite of performance testing scripts designed to evaluate the reliability, performance, and scalability of web applications and APIs.

It leverages [Grafana k6](https://k6.io/), a modern load testing tool, to simulate various traffic patterns and scenarios.

---

## 📂 Project Structure

Here is a detailed breakdown of the project scripts and their purposes:

### 1. 🏗️ Load Testing Strategies
These scripts are located in the root directory and test `https://test.k6.io`.

-   **`Load.js` (Load Test)**: 
    -   **Goal**: Assess system behavior under expected normal load.
    -   **Scenario**: Ramps up to **15 VUs** (Virtual Users) over 15s, holds for 10s, then ramps down.
    -   **Use Case**: consistent daily traffic simulation.

-   **`stress.js` (Stress Test)**: 
    -   **Goal**: Determine the limits of the system and stability under heavy load.
    -   **Scenario**: Ramps up to **30 VUs**, pushing harder than the load test.
    -   **Use Case**: identifying breaking points or resource bottlenecks.

-   **`spike.js` (Spike Test)**: 
    -   **Goal**: Verify system recovery after a sudden burst of traffic.
    -   **Scenario**: Starts at **2 VUs**, spikes suddenly to **10 VUs**, then recovers.
    -   **Use Case**: Simulating marketing events, sales, or viral content.

-   **`smoke.js`**: 
    -   **Goal**: A quick check to verify the system is up and the script works.
    -   **Use Case**: Run this before any major test suite.

### 2. 🧪 Test Creation & Thresholds
Located in `test_creation/`:

-   **`thresholds.js`**:
    -   **Goal**: run tests with Pass/Fail criteria (SLAs).
    -   **Metrics**: Defines thresholds like 95% of requests < 500ms.
    -   **Importance**: These are crucial for CI/CD pipelines to automatically fail a build if performance degrades.

### 3. 🔌 API Testing
Located in `http and Api/`:

-   Test specific HTTP methods against `https://automationexercise.com/api/productsList`.
-   **`get.js`**: Validates GET requests and checks for **200 OK** status codes.
-   **`post.js`, `put.js`**: (Assuming similar naming convention) Validate data submission and updates.

---

## 🛠️ Installation & Setup

1.  **Install k6**:
    -   **Windows**: 
        ```powershell
        winget install k6 
        # OR 
        choco install k6
        ```
    -   **macOS**: `brew install k6`
    -   **Linux**: `sudo apt-get install k6`

2.  **Verify Installation**:
    ```bash
    k6 version
    ```

---

## 🏃 Running Tests Locally

You can run any test using the CLI. Here are some useful commands:

### Basic Execution
```bash
k6 run Load.js
```

### execution with flags
Override script options directly from the CLI:
```bash
# Run with 10 virtual users for 30 seconds
k6 run --vus 10 --duration 30s smoke.js
```

### Debugging
See what's happening under the hood:
```bash
# Print HTTP request/response details
k6 run --http-debug smoke.js
```

### Output Formats
Save results to a JSON or CSV file for analysis:
```bash
k6 run Load.js --out json=results.json
```

---

## 🤖 CI/CD Pipeline (GitHub Actions)

This project is configured with a robust CI/CD pipeline using **GitHub Actions**.

-   **Configuration File**: `.github/workflows/k6.yml`
-   **Trigger**: Automatically runs on every `push` or `pull_request` to the `main` or `master` branches.

### Workflow Details
The pipeline has two main phases:

1.  **Smoke Test**: 
    -   Runs `smoke.js` with 1 VU for 10s.
    -   **Purpose**: Fast feedback loop to ensure the app isn't completely down.

2.  **Threshold Check**:
    -   Runs `test_creation/thresholds.js`.
    -   **Purpose**: Verifies that performance metrics (latency, error rate) meet the defined criteria. If this step fails, the deployment/PR is marked as failed.

---

## 📊 Understanding Results

When k6 finishes, it provides a summary of metrics. Key metrics to watch:

-   `http_req_duration`: Time for the request (includes latency, TTFB, etc.). Look at **p(95)** (95th percentile) to see what 95% of your users are experiencing.
-   `http_req_failed`: The percentage of failed requests. Ideally, this should be **0%**.
-   `vus`: Current number of active virtual users.
-   `checks`: The rate of successful assertions (e.g., "status is 200").

---

*"Performance is not a feature, it's a requirement."*
