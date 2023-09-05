//SPDX-License_Identifier:MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum ProductStatus { Created, InTransit, Delivered, OutOfStock }

    struct Product {
        uint256 productId;
        string name;
        address manufacturer;
        address distributor;
        address retailer;
        uint256 quantity;
        uint256 price;
        ProductStatus status;
        uint256 manufacturingTimestamp;
        uint256 deliveryTimestamp;
        mapping(address => uint256) ratings;
        uint256 totalRatings;
        uint256 totalRatingsCount;
    }

    mapping(uint256 => Product) public products;
    uint256 public productId;

    event ProductCreated(uint256 indexed productId, string name, address indexed manufacturer, uint256 timestamp);
    event ProductInTransit(uint256 indexed productId, address indexed distributor, uint256 timestamp);
    event ProductDelivered(uint256 indexed productId, address indexed retailer, uint256 timestamp);
    event ProductOutOfStock(uint256 indexed productId, uint256 timestamp);
    event ProductRated(uint256 indexed productId, address indexed rater, uint256 rating);

    modifier onlyManufacturer(uint256 _productId) {
        require(msg.sender == products[_productId].manufacturer, "Only the manufacturer can perform this operation.");
        _;
    }

    modifier onlyDistributor(uint256 _productId) {
        require(msg.sender == products[_productId].distributor, "Only the distributor can perform this operation.");
        _;
    }

    modifier onlyRetailer(uint256 _productId) {
        require(msg.sender == products[_productId].retailer, "Only the retailer can perform this operation.");
        _;
    }

    function createProduct(string memory _name, uint256 _quantity, uint256 _price) public{
        require(bytes(_name).length > 0, "Product name cannot be empty.");
        require(_quantity > 0, "Product quantity must be greater than zero.");
        require(_price > 0, "Product price must be greater than zero.");

        Product storage newProduct = products[productId];
    newProduct.productId = productId;
    newProduct.name = _name;
    newProduct.manufacturer = msg.sender;
    newProduct.distributor = address(0);
    newProduct.retailer = address(0);
    newProduct.quantity = _quantity;
    newProduct.price = _price;
    newProduct.status = ProductStatus.Created;
    newProduct.manufacturingTimestamp = block.timestamp;
    newProduct.deliveryTimestamp = 0;
newProduct.totalRatings = 0;

        emit ProductCreated(productId, _name, msg.sender, block.timestamp);
        productId++;
    }

    function shipProduct(uint256 _productId, address _distributor) public onlyManufacturer(_productId) {
        require(products[_productId].status == ProductStatus.Created, "Product is not in the Created state.");

        products[_productId].distributor = _distributor;
        products[_productId].status = ProductStatus.InTransit;
        products[_productId].deliveryTimestamp = block.timestamp;

        emit ProductInTransit(_productId, _distributor, block.timestamp);
    }

    function deliverProduct(uint256 _productId, address _retailer) public onlyDistributor(_productId) {
        require(products[_productId].status == ProductStatus.InTransit, "Product is not in transit.");

        products[_productId].retailer = _retailer;
        products[_productId].status = ProductStatus.Delivered;

        emit ProductDelivered(_productId, _retailer, block.timestamp);
    }

    function markProductOutOfStock(uint256 _productId) public onlyRetailer(_productId) {
        require(products[_productId].status != ProductStatus.OutOfStock, "Product is already out of stock.");

        products[_productId].status = ProductStatus.OutOfStock;
        

        emit ProductOutOfStock(_productId, block.timestamp);
    }

   function rateProduct(uint256 _productId, uint256 _rating) public {
    require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5.");

    Product storage product = products[_productId];
    require(product.status == ProductStatus.Delivered, "Product must be delivered to rate.");

    require(product.ratings[msg.sender] == 0, "You have already rated this product.");

    product.ratings[msg.sender] = _rating;
    product.totalRatings += _rating;
    product.totalRatingsCount += 1;

    emit ProductRated(_productId, msg.sender, _rating);
}

function getProductRating(uint256 _productId) public view returns (uint256) {
    Product storage product = products[_productId];
    require(product.status == ProductStatus.Delivered, "Product must be delivered to have a rating.");

    return product.totalRatings > 0 ? product.totalRatings / product.totalRatingsCount : 0;
}
}