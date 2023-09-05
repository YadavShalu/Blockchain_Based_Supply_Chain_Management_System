# Blockchain-based Supply Chain Management System Documentation

## Introduction

Welcome to our Blockchain-based Supply Chain Management System documentation. This system is designed to facilitate supply chain management on the Rinkeby testnet. Manufacturers, distributors, and retailers can use it to streamline the process of shipping products and tracking their movement through the supply chain.

## Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YadavShalu/Blockchain_Based_Supply_Chain_Management_System.git
   ```

2. **Install Dependencies**:
   - Ensure you have [Node.js](https://nodejs.org/) installed.
   - Install project dependencies:
     ```bash
     cd supply-chain-system
     npm install
     ```

3. **Configure MetaMask**:
   - Install [MetaMask](https://metamask.io/) and set it up with Rinkeby testnet accounts.

4. **Deploy Smart Contracts**:
   - Deploy smart contracts to Rinkeby using [Hardhat](https://hardhat.org/):
     ```bash
     npx hardhat deploy --network rinkeby
     ```

### Usage

#### User Roles

- **Manufacturer**: Register products and initiate product shipments.
- **Distributor**: Receive products and update their shipment status.
- **Retailer**: Track product shipments and manage sales.

#### Workflow

1. **Product Registration**:
   - Manufacturers can register products by providing unique IDs.

2. **Shipment Creation**:
   - Manufacturers initiate shipments by specifying product IDs and destinations.

3. **Product Tracking**:
   - Distributors receive products and update their status as they move through the supply chain.
   - Retailers can track product shipments and manage sales inventory.


## Contributing

We encourage contributions from the community. To contribute to the project, please follow our [Contribution Guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE.md).

