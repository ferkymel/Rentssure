// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;
contract rentAssure {
    address public  owner;
    mapping (address => uint)  public  InvestorList;
    mapping (address => uint) public InterestToPayInv;
    mapping (address => int) public InterestToChargetDriv;
    mapping (address => uint)  public  DevsListDriv;
    mapping (address => string)  public  NumbPlate;
    mapping (address => uint)  public  mountPayMonthDriv;
    mapping (address => uint)  private timeToPay; //private
    address[] private addressInvestor;  //private
    address[] private addressAux;        //private
    constructor() {
        owner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner,"Only owner");
        _;
    }
    modifier askForMoney(uint amount){
        require(address(this).balance >= amount);
        _;
    }
    function receiveInv (address _tenant) external payable{
        require(_tenant != address(0),"address zero");
        InvestorList[msg.sender] = msg.value;
        calculate_interest(msg.sender);
        divideInterest(msg.sender,_tenant);
        timeToPay[msg.sender] = uint(block.timestamp + 365 days);
        timeToPay[_tenant] = uint(block.timestamp + 365 days);
        addressInvestor.push(msg.sender);
        addressInvestor.push(_tenant);
    }
    function getBalance() public view returns(uint)  {
        return address(this).balance;
   }
    function calculate_interest (address member) private {
        require(member != address(0),"address zero");
        InterestToPayInv[member] = InvestorList[member]*9/100;
    }
    function pay(address des) public payable {
        require(des != address(0),"address zero");
        address payable receptor = payable (des);
        uint cantidad = InterestToPayInv[des];
        receptor.transfer(cantidad);
        delete InterestToPayInv[des];
        delete InvestorList[des];
    }

    function giveCredit(uint amount, address member,  string memory plate) public askForMoney(amount){
        require(member != address(0),"address zero");
        address payable receptor = payable (member);
        DevsListDriv[msg.sender] = amount;
        InterestToChargetDriv[msg.sender] = int(amount + amount*9/100);
        NumbPlate[msg.sender] = plate;
        receptor.transfer(amount); 
        mountPayMonthDriv[msg.sender]= (uint(InterestToChargetDriv[msg.sender]) / 12)+1;
    }
    function payDebtPerMouthDriver() external payable{
        require(msg.value== mountPayMonthDriv[msg.sender], "amount diferent");
        InterestToChargetDriv[msg.sender]= InterestToChargetDriv[msg.sender]- int(msg.value);
        if(InterestToChargetDriv[msg.sender]<=0){
            delete InterestToChargetDriv[msg.sender];
            delete DevsListDriv[msg.sender];
            delete NumbPlate[msg.sender];
            delete mountPayMonthDriv[msg.sender];
        }
    }
    function divideInterest(address _owner, address _tenant) private {
        uint interesTotal = InterestToPayInv[_owner];
        InterestToPayInv[_owner]= interesTotal*44/100;
        InterestToPayInv[_tenant]= (interesTotal*44/100) + InvestorList[_owner];
    } 
    function checkDate() public {
        for (uint256 i = 0; i < addressInvestor.length; i++) {
            if(block.timestamp > timeToPay[addressInvestor[i]]){
                pay(addressInvestor[i]);
                delete addressInvestor[i];
            }
        }
        deleteAddressZero();
    }
    function deleteAddressZero() private { 
        for (uint256 i = 0; i < addressAux.length; i++) {
            addressAux.pop();
        }
        for (uint256 i = 0; i < addressInvestor.length; i++) {
            if(addressInvestor[i]!=address(0)){
                addressAux.push(addressInvestor[i]);
            }
        }
        addressInvestor=addressAux;
    }
    function giveFunds() external payable{
    }
    function recover(uint amount) public onlyOwner{
        address payable _owner = payable (owner);
        _owner.transfer(amount);
    }
    function getOwner() public view returns( address ){
        return owner;
    }
}
