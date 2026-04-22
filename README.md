<div align="center">
  <img src="public/favicon.png" width="120" height="120" alt="Conduit Logo" />
  <h1>🚀 Conduit Ecosystem Architect</h1>
  <p><b>The Definitive Open Banking Intelligence & Autonomous Observability Operating System</b></p>
  <p><i>Quantifying the financial cost of infrastructure latency through revenue-linked observability.</i></p>

  <div align="center">
    <img src="https://img.shields.io/badge/Status-Production--Ready-brightgreen" alt="Status" />
    <img src="https://img.shields.io/badge/Framework-React--19-blue" alt="React" />
    <img src="https://img.shields.io/badge/Build-Vite--6-purple" alt="Vite" />
    <img src="https://img.shields.io/badge/Security-Privacy--First-orange" alt="Security" />
  </div>
</div>

---

## 🏛️ Executive Summary

**Conduit** is not just a dashboard; it is a mission-critical operating system for the next generation of financial infrastructure. In the era of Open Banking, UPI, and Account Aggregators (AA), the biggest risk to a fintech's bottom line is not just "downtime," but "revenue leakage" caused by micro-latencies, partner-side timeouts, and silent API failures.

Traditional observability tools (DataDog, New Relic) focus on CPU and RAM. **Conduit focuses on Rupees and Revenue.** It bridges the gap between infrastructure metrics and business impact, providing a cinematic, high-fidelity lens through which architects can monitor, protect, and optimize their financial ecosystem.

Conduit follows a **Privacy-First AI** philosophy, utilizing an internal intelligence layer that operates without external API dependencies, making it suitable for secure, regulated, and air-gapped financial environments.

---

## 💎 Design Philosophy: The Cinematic Enterprise

Conduit is built on the principle of **Visual Excellence**. We believe that mission-critical tools should not look like spreadsheets. 

### Core Aesthetic Pillars:
1. **Glassmorphism & Depth**: Utilizing semi-transparent materials, backdrop blurs, and layered elevations to create a sense of navigational hierarchy and focus.
2. **High-Performance Motion**: Leveraging `motion` (Framer Motion) for orchestrated transitions, layout animations, and micro-interactions that make the interface feel alive and responsive.
3. **Information Density with Clarity**: Employing advanced typography and modular grids to present massive amounts of telemetry data without overwhelming the operator.
4. **Dark-Mode Dominance**: The interface is optimized for NOC (Network Operations Center) environments, using a deep palette from Midnight Navy to Electric Cyan.

---

## 🧩 Architectural Deep Dive

### 1. Frontend Infrastructure
Conduit is powered by **React 19** and **Vite 6**, ensuring near-instantaneous HMR (Hot Module Replacement) and ultra-fast production builds. The architecture is strictly modular:
- **`components/`**: Atomic and molecular UI components (Layout, Sidebar, Cards).
- **`services/`**: Abstracted logic layers for data simulation and AI inference.
- **`constants/`**: Unified design tokens and application configuration.
- **`types.ts`**: Strict TypeScript definitions for the entire financial domain model.

### 2. The Intelligence Layer (LSTMWATCH)
At the heart of Conduit lies the **AI Resolution Engine**.
- **Predictive Maintenance**: Using sequence modeling patterns (simulated LSTM) to identify traffic drift before it results in a P1 incident.
- **Automated Remediation**: When a failure is detected, Conduit doesn't just alert; it proposes and can execute failovers to secondary UPI nodes or alternative Account Aggregator bridges.
- **Mock Service Layer**: To ensure privacy and zero-latency inference, the AI logic is grounded in pre-configured heuristic engines and mock services that require **no external API keys** (fully decoupled from Gemini/OpenAI).

### 3. Data Visualization Strategy
We use a hybrid approach to data rendering:
- **Recharts**: For high-fidelity, interactive time-series data and distribution charts.
- **D3.js**: For the **Partner Network Graph**, utilizing force-directed simulations to visualize the real-time topology of API connections and their health states.
- **Custom SVG primitives**: For unique indicators like the "Revenue Pulse" and "SLA Heatmaps."

---

## 🚀 Module Glossary & Workflows

### 🏥 Observability Hub
The nerve center of the platform. It provides a real-time stream of every Kafka-linked event in the ecosystem. 
- **Metrics**: Success rates, Latency (P50/P90/P99), and Throughput.
- **Distributed Tracing**: Follow a single transaction across five different partner nodes.

### 📊 SLA Scorecard (The Attribution Engine)
In a multi-partner ecosystem, knowing *that* something is slow is easy; knowing *who* is responsible is hard. The SLA Scorecard automatically attributes latency costs to specific partners (FIPs, UPI Hubs, Gateways), enabling data-driven contract enforcement.

### 🛡️ Revenue Shield
The Revenue Shield translates technical failures into financial impact. It calculates "Revenue at Risk" by multiplying transaction volume by success rate deltas, providing a real-time ticker of precisely how much money is being lost during an incident.

### 🧭 Partner Network Graph
A deep-dive visualization of your connectivity matrix.
- **Nodes**: Represent internal services and external partners.
- **Edges**: Represent active API lanes.
- **Real-time Status**: Color-coded paths (Green/Amber/Red) indicate the current health of the integration.

### 🤖 AI Resolution Engine & Assistant
A conversational and autonomous interface for high-stakes decision making.
- **Assistant**: Natural language querying for system health (e.g., "Why did the West region latency spike at 3 PM?").
- **Resolution**: A step-by-step trace of AI decision logic, from input collection to proposed remediation execution.

---

## 🛠️ Installation & Development

### Local Environment Setup

1. **System Requirements**: 
   - Node.js v18.0.0 or higher.
   - npm v9.0.0 or higher.
   - A modern browser with WebGL support (for D3/Motion transitions).

2. **Clone and Install**:
   ```powershell
   git clone https://github.com/your-org/conduit-v2.git
   cd conduit-v2
   npm install
   ```

3. **Development Cycle**:
   ```powershell
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Linting & Quality**:
   ```powershell
   npm run lint
   ```

### Dependency Management (Rollup/Windows)
If you encounter errors related to `@rollup/rollup-win32-x64-msvc`, it is likely due to an npm optional dependency bug on Windows. To fix:
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

## 🌍 Deployment Strategy

Conduit is optimized for **Serverless Edge Environments**.



## 🤝 Contribution Guidelines

We welcome contributions from the fintech and observability communities.

### Branching Strategy
- **`main`**: Production-ready code.
- **`develop`**: Integration branch for new features.
- **`feature/[name]`**: Development branches for specific enhancements.

### Naming Conventions
- **Components**: PascalCase (e.g., `RevenueShield.tsx`).
- **Styles**: Use the established design tokens in `index.css`.
- **Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/).

### Deployment Checks
Before submitting a PR, ensure:
1. `npm run lint` passes without errors.
2. `npm run build` completes successfully.
3. All mock services return valid responses.

---

## 📜 License & Compliance

Conduit is distributed under a proprietary license for enterprise deployment. It is designed to be **GDPR and DPDP (Digital Personal Data Protection Act)** compliant by ensuring no PII (Personally Identifiable Information) leaves your private cloud, thanks to our local AI inference model.

---

## 📞 Support & Community

- **Project Lead**: Akash Raj
- **Architecture**: Ecosystem Architect Division
- **Issues**: Open a ticket in the repository's 'Issues' tab.

---

<div align="center">
  <p><b>Protecting the pulse of Open Banking.</b></p>
  <p><i>Conduit — Built by Architects, for Architects.</i></p>
</div>
