import { contractABI,contractAddress } from "./constants.js";
$(document).ready(async function(){
  await ethereum.enable();
  const web3=new Web3(ethereum);
  const accounts=await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress)
  const getProductDetailsButton=document.querySelector("#trackProductBtn");
  const getProductDetails=async (ProductID)=>{
    
    const product=await contract.methods.products(ProductID).call();
    const {
      name,
      manufacturer,
      distributor,
      retailer,
      quantity,
      price,
      status,
      manufacturingTimestamp,
      deliveryTimestamp,
      totalRatings
    }=product;
    var statusValue;
    if(status==0)statusValue="Created";
    if(status==1)statusValue="InTransit";
    if(status==2)statusValue="Delivered";
    if(status==3)statusValue="Out of Stock";
    document.getElementById("right-middle-container").style.display="block";
    document.getElementById("productNameTableValue").innerHTML=name;
    document.getElementById("productQuantityTableValue").innerHTML=quantity;
    document.getElementById("manufacturerAddressTableValue").innerHTML=manufacturer;
    document.getElementById("distributorAddressTableValue").innerHTML=distributor;
    document.getElementById("retailerAddressTableValue").innerHTML=retailer;
    document.getElementById("productPriceTableValue").innerHTML=price;
    document.getElementById("productStatusAddressValue").innerHTML=statusValue;
    document.getElementById("manufacturingTimestampTableValue").innerHTML=manufacturingTimestamp;
    document.getElementById("deliveringTimestampTableValue").innerHTML=deliveryTimestamp;
    document.getElementById("totalRatingsTableValue").innerHTML=totalRatings;
  }
  const createProduct =async (productName,productQuanitity,productPrice)=>{
    await contract.methods.createProduct(productName,productQuanitity,productPrice).send({from:"0xa805893937bF6FcF40a9A013408eDB39384DC796"});
    console.log("Product Created");
  };
  const shipProduct=async (productID,distributorAddress)=>{
    await contract.methods.shipProduct(productID,distributorAddress).send({from:"0xa805893937bF6FcF40a9A013408eDB39384DC796"});
    console.log("Product Shipped");
  };
  const deliverProduct=async (productID,retailerAddress)=>{
    await contract.methods.deliverProduct(productID,retailerAddress).send({from:"0xeA31c015183f4de93f15D60BAdbe8a476ae78797"});
    console.log("Product Delivered");

  }
  const markProductOutOfStock=async (productID)=>{
    await contract.methods.markProductOutOfStock(productID).send({from:"0xA5C225BdC752aDC5C7468168d719FA521E456043"});
    console.log("out of stock");
  };
  const rateProduct=async (productID,rating)=>{
    await contract.methods.rateProduct(productID,rating).send({from:"0xa805893937bF6FcF40a9A013408eDB39384DC796"});
    console.log("Product Rated");
  };
 
  getProductDetailsButton.addEventListener('click',()=>{
    const ProductID=document.getElementById("productID-middle-container").value;
    getProductDetails(ProductID);
    document.getElementById("productID-middle-container").value="";
});


  const buttoncreate=document.getElementById("productCreationBtn");
  buttoncreate.addEventListener("click",()=>{
    document.getElementById("overlay").style.display="block";
    document.getElementById("bottom-overlay").style.display="block";
    document.getElementById("createProductForm").style.display="block";
    
    
  });
  const buttonship=document.getElementById("productShipping");
  buttonship.addEventListener("click",()=>{
    document.getElementById("overlay").style.display="block";
    document.getElementById("bottom-overlay").style.display="block";
    document.getElementById("shipProductForm").style.display="block";
    
  });
  const buttondeliver=document.getElementById("productDelivering");
  buttondeliver.addEventListener("click",()=>{
    document.getElementById("overlay").style.display="block";
    document.getElementById("bottom-overlay").style.display="block";
    document.getElementById("deliverProductForm").style.display="block";
    
  });
  const buttonstock=document.getElementById("markProductOutOfStock");
  buttonstock.addEventListener("click",()=>{
    document.getElementById("overlay").style.display="block";
    document.getElementById("bottom-overlay").style.display="block";
    document.getElementById("productAvailabilityForm").style.display="block";
    
  });
  const buttonrate=document.getElementById("markRating");
  buttonrate.addEventListener("click",()=>{
    document.getElementById("overlay").style.display="block";
    document.getElementById("bottom-overlay").style.display="block";
    document.getElementById("productRatingForm").style.display="block";
    
  });
 

  const createProductSubmit=document.getElementById("createProductSubmit");
  createProductSubmit.addEventListener("click",()=>{
    const productName=document.getElementById("productNameValue").value;
    const productQuanitity=document.getElementById("productQuantityValue").value;
    const productPrice=document.getElementById("productPriceValue").value;
    document.getElementById("overlay").style.display="none";
    document.getElementById("bottom-overlay").style.display="none";
    document.getElementById("createProductForm").style.display="none";
    createProduct(productName,productQuanitity,productPrice);
  }); 

  const shipProductSubmit=document.getElementById("shipProductSubmit");
  shipProductSubmit.addEventListener("click",()=>{
    const productID=document.getElementById("productIDValueShip").value;
    const distributorAddress=document.getElementById("distributorAddressValue").value;
    document.getElementById("overlay").style.display="none";
    document.getElementById("bottom-overlay").style.display="none";
    document.getElementById("shipProductForm").style.display="none";
    shipProduct(productID,distributorAddress);
  });

  const deliverProductSubmit=document.getElementById("deliverProductSubmit");
  deliverProductSubmit.addEventListener("click",()=>{
    const productID=document.getElementById("productIDValueDeliver").value;
    console.log(productID);
    const retailerAddress=document.getElementById("retailerAddressValue").value;
    document.getElementById("overlay").style.display="none";
    document.getElementById("bottom-overlay").style.display="none";
    document.getElementById("deliverProductForm").style.display="none";
    deliverProduct(productID,retailerAddress);
  });

  const availableProductSubmit=document.getElementById("availableProductSubmit");
  availableProductSubmit.addEventListener("click",()=>{
    const productID=document.getElementById("productIDValueAvailable").value;
    console.log(productID);
    document.getElementById("overlay").style.display="none";
    document.getElementById("bottom-overlay").style.display="none";
    document.getElementById("productAvailabilityForm").style.display="none";
    markProductOutOfStock(productID);
  });

  const productRating=document.getElementById("RatingProductSubmit");
  productRating.addEventListener("click",()=>{
    const productID=document.getElementById("productIDValueGiveRating").value;
    const rating=document.getElementById("productRatingValue").value;
    document.getElementById("overlay").style.display="none";
    document.getElementById("bottom-overlay").style.display="none";
    document.getElementById("productRatingForm").style.display="none";
    rateProduct(productID,rating);
  });
  document.getElementById("right-middle-container").addEventListener("click",()=>{
document.getElementById("right-middle-container").style.display="none";
  });

});