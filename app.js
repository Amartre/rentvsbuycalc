let YrOneTotalRent = [2300, 20]; //monthly rent yr 1 + renters insurance
let AnnualRentIncreaseArray = [2320, 2389.6, 2461.29, 2535.13, 2611.18]; //rent yr input all years
let TotalSpentRent = 147806.3409504; // Total spent on rent for years inputted


let BuyingMonthExpenseArr = [1145.8, 1100, 200]; // array for total month expense in table (P&I, Prop. Tax&Ins., Maint&Repairs)
let TotalBuyingMonthExpense = 2445.8;
let PropTaxIns = [1000, 100, 0]; //property tax, home insurance, mortgage insurance, used for table total month expense
let MaintRepairsArr = [100, 100]; // maintenance and repair for buyingmonthexpense array


let IntArr = [];
let intSum = 0;
let PrinArr = [];
let prinSum = 0;


let NetGainArr = [240000, 22926.169999999995, 19873.45, 18000]; //Loanamount, prinSum, finalselling, cost
let investment = 254947.28000000003;
let AppreciatedPriceArr = [331224.24];


let PropertyTaxYrArray = [2445.8, 2485.8, 2527.4, 2570.66, 2615.66]; //month total for year after proptax increase is inputted 
let TotalSpentBuying = 151743.87072;
let YearsArr = [1, 2, 3, 4, 5];

function RentHide() {
    var x = document.getElementById("renting-section");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function BuyHide() {
    var x = document.getElementById("buying-section");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function OtherHide() {
    var x = document.getElementById("other-section");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


var data = {
    labels: YearsArr,
    datasets: [{
        label: "Rent",
        backgroundColor: "rgb(255, 109, 44)",
        data: AnnualRentIncreaseArray,
    },

    {
        label: "Buy",
        backgroundColor: "rgb(25, 110, 183)",
        data: PropertyTaxYrArray,
    }]

};

//config block

const config = {
    type: 'bar',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

//init block 

let myChart = new Chart(
    document.getElementById('myChart'),
    config

)


function updateChart() {
    myChart.data.labels = YearsArr;
    myChart.data.datasets[0].data = AnnualRentIncreaseArray;
    myChart.data.datasets[1].data = PropertyTaxYrArray;
    myChart.update();
}



function rnd(n) {
    return Math.round(n * 100) / 100;
};



function MonthRent() {
    monthRent = (document.getElementById("monthlyrent").value).replace(/\,/g, '');
    monthRentNum = Number(monthRent);
    YrOneTotalRent[0] = 0;
    YrOneTotalRent[0] = monthRentNum;
    RentYr1 = YrOneTotalRent[0] + YrOneTotalRent[1];
    RentYr1Format = RentYr1.toLocaleString("en-US");
    document.getElementById("table-total-year1").textContent = RentYr1Format;
    monthRentFormat = monthRentNum.toLocaleString("en-US");
    document.getElementById("monthlyrent").value = monthRentFormat;
    document.getElementById("table-cost-rent-yr1").textContent = monthRentFormat;


    if (monthRentNum > 0) {
        RentIncrease.call();
    };
};



function RentInsurance() {
    rentInsurance = (document.getElementById("rentinsure").value).replace(/\,/g, '');
    rentInsuranceNum = Number(rentInsurance);
    YrOneTotalRent[1] = 0;
    YrOneTotalRent[1] = rentInsuranceNum;
    RentYr1 = YrOneTotalRent[0] + YrOneTotalRent[1];
    RentYr1Format = RentYr1.toLocaleString("en-US");
    document.getElementById("table-total-year1").textContent = RentYr1Format;
    rentInsuranceFormat = rentInsuranceNum.toLocaleString("en-US");
    document.getElementById("rentinsure").value = rentInsuranceFormat;
    document.getElementById("table-rentinsure").textContent = rentInsuranceFormat;


    if (rentInsuranceNum > 0) {
        RentIncrease.call();
    };
};



function RentIncrease() {
    yearsBeforeSelling = Number(document.getElementById("yrsbeforeselling").value);
    rateIncrease = (Number(document.getElementById("rateincrease").value) / 100);
    nyears = yearsBeforeSelling - 1;
    finalRate = 1 + rateIncrease;
    partOne = finalRate ** nyears;
    YrInputRent = rnd(partOne * YrOneTotalRent[0]); //yr(whatever user input) rent
    YrInputRentFormat = YrInputRent.toLocaleString("en-US");
    document.getElementById("table-cost-rent-input").textContent = YrInputRentFormat;
    insuranceIncrease = rnd(partOne * YrOneTotalRent[1]);
    insuranceIncreaseFormat = insuranceIncrease.toLocaleString("en-US");
    document.getElementById("table-increase-insurance").textContent = insuranceIncreaseFormat;
    TotalYrInput = rnd(YrInputRent + insuranceIncrease);
    TotalYrInputFormat = TotalYrInput.toLocaleString("en-US");
    document.getElementById("table-totalrent-input").textContent = TotalYrInputFormat;



    AnnualRentIncreaseArray = [];
    TotalSpentRent = 0;



    for (let t = 0; t <= nyears; t++) {
        toMultiply = finalRate ** [t];
        monthRentIncrease = toMultiply * YrOneTotalRent[0];
        monthInsuranceIncrease = toMultiply * YrOneTotalRent[1];
        AnnualRentIncreaseArray.push(rnd(monthRentIncrease + monthInsuranceIncrease));
        TotalSpentRent += (AnnualRentIncreaseArray[t] * 12);
    };

    rndTotalSpentRent = rnd(TotalSpentRent);
    TotalSpentRentFormat = rndTotalSpentRent.toLocaleString("en-US")
    document.getElementById("totalspentrent").textContent = TotalSpentRentFormat;



    YearsArr = [];
    for (let t = 1; t <= yearsBeforeSelling; t++) {
        YearsArr.push(t);
    };
    updateChart.call();
};



function Price() {
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    homePriceFormat = homePriceNum.toLocaleString("en-US");
    document.getElementById("homeprice").value = homePriceFormat;
    if (Number(document.getElementById("homeappreciation").value) > 0) {
        Appreciation.call();
    };
    if (Number(document.getElementById("percentdown").value) > 0) {
        GetDownAmount.call();
    };
    if (Number(document.getElementById("interest").value) > 0) {
        Interest.call();
    };
    if (Number(document.getElementById("propertytax").value) > 0) {
        PropertyTax.call();
    };
    if (Number(document.getElementById("sellingcost").value) > 0) {
        SellingCost.call()
    };
};



function GetDownPercent() { //Gets downdollar and converts to percent
    dollarDown = (document.getElementById("dollardown").value).replace(/\,/g, '');
    dollarDownNum = Number(dollarDown);
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    dollarDownFormat = dollarDownNum.toLocaleString("en-US");
    document.getElementById("dollardown").value = dollarDownFormat;


    downPaymentPercent = rnd((dollarDownNum / homePriceNum) * 100);
    document.getElementById("percentdown").value = downPaymentPercent;
    loanAmount = rnd(homePriceNum - dollarDownNum);
    loanAmountFormat = loanAmount.toLocaleString("en-US");
    document.getElementById("loanamount").value = loanAmountFormat;
    //test
    NetGainArr[0] = 0;
    investment = 0;
    NetGainArr[0] = loanAmount;
    investment = NetGainArr[0] - NetGainArr[1] + NetGainArr[2] + NetGainArr[3];
    netGain = AppreciatedPriceArr[0] - investment;
    netGainFormat = netGain.toLocaleString("en-US");
    document.getElementById("netgain").textContent = netGainFormat;



    if (downPaymentPercent >= 20) {
        document.getElementById("monthmortgageinsurance").value = 0;
        PropTaxIns[2] = 0;
        document.getElementById("monthmortgageinsurance").readOnly = true;
        document.getElementById("monthmortgageinsurance").style.backgroundColor = '#D3D3D3';
        document.getElementById("homeinsurance-div").style.backgroundColor = '#D3D3D3';
        PropertyTax.call();
    } else if (downPaymentPercent < 20) {
        document.getElementById("monthmortgageinsurance").readOnly = false;
        document.getElementById("monthmortgageinsurance").style.backgroundColor = '';
        document.getElementById("homeinsurance-div").style.backgroundColor = '';
    }

    if (Number(document.getElementById("interest").value) > 0) {
        Interest.call();
    };

    if (Number(document.getElementById("propertytax").value) > 0) {
        PropertyTax.call();
    };
};



function GetDownAmount() {
    percentDown = Number(document.getElementById("percentdown").value);
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    downPaymentDollars = rnd(homePrice * (percentDown / 100));
    downPaymentDollarsFormat = downPaymentDollars.toLocaleString("en-US");
    document.getElementById("dollardown").value = downPaymentDollarsFormat;
    loanAmount = rnd(homePriceNum - downPaymentDollars);
    loanAmountFormat = loanAmount.toLocaleString("en-US");
    document.getElementById("loanamount").value = loanAmountFormat;
    //test

    NetGainArr[0] = 0;
    investment = 0;
    NetGainArr[0] = loanAmount;
    investment = NetGainArr[0] - NetGainArr[1] + NetGainArr[2] + NetGainArr[3];
    netGain = AppreciatedPriceArr[0] - investment;
    netGainFormat = netGain.toLocaleString("en-US");
    document.getElementById("netgain").textContent = netGainFormat;



    if (Number(document.getElementById("percentdown").value) >= 20) {
        document.getElementById("monthmortgageinsurance").value = 0;
        PropTaxIns[2] = 0;
        document.getElementById("monthmortgageinsurance").readOnly = true;
        document.getElementById("monthmortgageinsurance").style.backgroundColor = '#D3D3D3';
        document.getElementById("homeinsurance-div").style.backgroundColor = '#D3D3D3';
        PropertyTax.call();
    } else if (Number(document.getElementById("percentdown").value) < 20) {
        document.getElementById("monthmortgageinsurance").readOnly = false;
        document.getElementById("monthmortgageinsurance").style.backgroundColor = '';
        document.getElementById("homeinsurance-div").style.backgroundColor = '';
    }

    if (Number(document.getElementById("interest").value) > 0) {
        Interest.call();
    };

    if (Number(document.getElementById("propertytax").value) > 0) {
        PropertyTax.call();
    };
};



function Interest() {
    interestRate = Number(document.getElementById("interest").value);
    loanAmount = (document.getElementById("loanamount").value).replace(/\,/g, '');
    loanAmountNum = Number(loanAmount);
    term = Number(document.getElementById("loanlength").value);
    rate = (interestRate / 100) / 12;
    payments = term * 12;
    PItotal = rnd(loanAmountNum * [rate * (1 + rate) ** payments] / [(1 + rate) ** payments - 1]);
    PItotalFormat = PItotal.toLocaleString("en-US");
    document.getElementById("table-pi").textContent = PItotalFormat;
    BuyingMonthExpenseArr[0] = 0;
    BuyingMonthExpenseArr[0] = PItotal;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;



    var m;
    var balance = loanAmountNum;
    var totalInterest = 0;
    var months = (Number(document.getElementById("yrsbeforeselling").value) * 12) - 1;

    IntArr = [];
    intSum = 0;
    PrinArr = [];
    prinSum = 0;

    for (m = 1; m <= payments; m++) {
        var toInterest = rnd(balance * rate);
        totalInterest = rnd(totalInterest + toInterest);
        var toPrincipal = rnd(PItotal - toInterest);
        balance = rnd(balance - toPrincipal);
        IntArr.push(toInterest);
        PrinArr.push(toPrincipal);
    };

    for (let j = 0; j <= months; j++) {
        intSum += IntArr[j];
    };

    for (let j = 0; j <= months; j++) {
        prinSum += PrinArr[j];
    };

    intSumNum = rnd(intSum);
    prinSumNum = rnd(prinSum);
    intSumFormat = intSumNum.toLocaleString("en-US");
    prinSumFormat = prinSumNum.toLocaleString("en-US");
    document.getElementById("principalpaid").textContent = prinSumFormat;
    document.getElementById("interestpaid").textContent = intSumFormat;

    //test
    NetGainArr[1] = 0;
    investment = 0;
    NetGainArr[1] = prinSum;
    investment = NetGainArr[0] - NetGainArr[1] + NetGainArr[2] + NetGainArr[3];
    netGain = AppreciatedPriceArr[0] - investment;
    netGainFormat = netGain.toLocaleString("en-US");
    document.getElementById("netgain").textContent = netGainFormat;

    if (Number(document.getElementById("taxincrease").value) > 0) {
        PropertyTaxIncrease.call();
    };
};



function LoanLength() {
    if (Number(document.getElementById("yrsbeforeselling").value) > Number(document.getElementById("loanlength").value) && Number(document.getElementById("loanlength").value) >= 10) {
        document.getElementById("yrsbeforeselling").value = document.getElementById("loanlength").value;
        ChangeYearsBeforeSelling.call();
    }  // *******Newly added 

    if (Number(document.getElementById("interest").value) > 0) {
        Interest.call();
    };

    if (Number(document.getElementById("taxincrease").value) > 0) {
        PropertyTaxIncrease.call();
    };
};



function PropertyTax() {
    taxRate = (Number(document.getElementById("propertytax").value)) / 100;
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    yrTax = rnd(taxRate * homePriceNum);
    PropTaxIns[0] = rnd(yrTax / 12);
    BuyingMonthExpenseArr[1] = rnd(PropTaxIns[0] + PropTaxIns[1] + PropTaxIns[2]);
    BuyingMonthExpenseArrFormat = BuyingMonthExpenseArr[1].toLocaleString("en-US");
    document.getElementById("table=proptaxins").textContent = BuyingMonthExpenseArrFormat;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;
    if (Number(document.getElementById("taxincrease").value) > 0) {
        PropertyTaxIncrease.call();
    };
};



function PropertyTaxIncrease() {
    PropertyTaxYrArray = [];
    TotalSpentBuying = 0;
    increaseRate = Number(document.getElementById("taxincrease").value) / 100
    nyears = Number(document.getElementById("yrsbeforeselling").value) - 1;
    propertyTaxYr = PropTaxIns[0] * 12;
    stepOne = increaseRate + 1;
    stepTwo = stepOne ** nyears;
    Final = propertyTaxYr * stepTwo;

    for (let t = 0; t <= nyears; t++) {
        taxesForYears = stepOne ** [t];
        finalYearTaxes = propertyTaxYr * taxesForYears;
        MonthTax = finalYearTaxes / 12;
        NewPropTaxIns = PropTaxIns[1] + PropTaxIns[2] + MonthTax + BuyingMonthExpenseArr[2] + BuyingMonthExpenseArr[0];
        PropertyTaxYrArray.push(rnd(NewPropTaxIns));
        length = PropertyTaxYrArray.length - 1;
    };

    for (let j = 0; j <= length; j++) {
        TotalSpentBuying += (PropertyTaxYrArray[j] * 12);
    };

    TotalSpentBuyingFormat = (rnd(TotalSpentBuying)).toLocaleString("en-US"); // rnd was newly addded

    document.getElementById("totalspentbuying").textContent = TotalSpentBuyingFormat;

    updateChart.call();
};



function MonthHomeInsurance() {
    homeInsurance = (document.getElementById("monthhomeinsurance").value).replace(/\,/g, '');
    homeInsuranceNumber = Number(homeInsurance);
    PropTaxIns[1] = rnd(homeInsuranceNumber);
    BuyingMonthExpenseArr[1] = rnd(PropTaxIns[0] + PropTaxIns[1] + PropTaxIns[2]);
    BuyingMonthExpenseArrFormat = BuyingMonthExpenseArr[1].toLocaleString("en-US");
    document.getElementById("table=proptaxins").textContent = BuyingMonthExpenseArrFormat;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;
    homeInsuranceFormat = homeInsuranceNumber.toLocaleString("en-US");
    document.getElementById("monthhomeinsurance").value = homeInsuranceFormat;


    if (TotalSpentBuying > 0) {
        PropertyTaxIncrease.call();
    };
};



function MonthHOA() {
    monthHOA = (document.getElementById("monthhoa").value).replace(/\,/g, '');
    monthHOANumber = Number(monthHOA);
    MaintRepairsArr[0] = monthHOANumber;
    BuyingMonthExpenseArr[2] = rnd(MaintRepairsArr[0] + MaintRepairsArr[1]);
    BuyingMonthExpenseArrFormat = BuyingMonthExpenseArr[2].toLocaleString("en-US");
    document.getElementById("table-maintrepairs").textContent = BuyingMonthExpenseArrFormat;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;
    monthHOAFormat = monthHOANumber.toLocaleString("en-US");
    document.getElementById("monthhoa").value = monthHOAFormat;


    if (TotalSpentBuying > 0) {
        PropertyTaxIncrease.call();
    };
};



function MonthRepairs() {
    monthRepairs = (document.getElementById("monthrepairs").value).replace(/\,/g, '');
    monthRepairsNumber = Number(monthRepairs);
    MaintRepairsArr[1] = monthRepairsNumber;
    BuyingMonthExpenseArr[2] = rnd(MaintRepairsArr[0] + MaintRepairsArr[1]);
    BuyingMonthExpenseArrFormat = BuyingMonthExpenseArr[2].toLocaleString("en-US");
    document.getElementById("table-maintrepairs").textContent = BuyingMonthExpenseArrFormat;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;
    monthRepairsFormat = monthRepairsNumber.toLocaleString("en-US");
    document.getElementById("monthrepairs").value = monthRepairsFormat;

    if (TotalSpentBuying > 0) {
        PropertyTaxIncrease.call();
    };
};



function MonthMortgageInsurance() {
    monthMortgageInsurance = (document.getElementById("monthmortgageinsurance").value).replace(/\,/g, '');
    monthMortgageInsuranceNumber = Number(monthMortgageInsurance);
    PropTaxIns[2] = rnd(monthMortgageInsuranceNumber);
    BuyingMonthExpenseArr[1] = rnd(PropTaxIns[0] + PropTaxIns[1] + PropTaxIns[2]);
    BuyingMonthExpenseArrFormat = BuyingMonthExpenseArr[1].toLocaleString("en-US");
    document.getElementById("table=proptaxins").textContent = BuyingMonthExpenseArrFormat;
    TotalBuyingMonthExpense = 0;
    TotalBuyingMonthExpense = rnd(BuyingMonthExpenseArr[0] + BuyingMonthExpenseArr[1] + BuyingMonthExpenseArr[2]);
    TotalBuyingMonthExpenseFormat = TotalBuyingMonthExpense.toLocaleString("en-US");
    document.getElementById("table-total-buying-year1").textContent = TotalBuyingMonthExpenseFormat;
    monthMortgageInsuranceFormat = monthMortgageInsuranceNumber.toLocaleString("en-US");
    document.getElementById("monthmortgageinsurance").value = monthMortgageInsuranceFormat;



    if (TotalSpentBuying > 0) {
        PropertyTaxIncrease.call();
    };
};



function Appreciation() {
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    homeAppreciation = (Number(document.getElementById("homeappreciation").value)) / 100;
    yearsBeforeSelling = Number(document.getElementById("yrsbeforeselling").value);
    stepOne = homeAppreciation + 1;
    stepTwo = stepOne ** yearsBeforeSelling;
    appreciatedPrice = rnd(homePriceNum * stepTwo);
    AppreciatedPriceArr[0] = 0;
    AppreciatedPriceArr[0] = appreciatedPrice;
    appreciatedPriceFormat = appreciatedPrice.toLocaleString("en-US");
    document.getElementById("appreciated-value").textContent = appreciatedPriceFormat;
    appreciationGain = rnd(appreciatedPrice - homePriceNum);
    appreciationGainFormat = appreciationGain.toLocaleString("en-US");
    document.getElementById("appreciated-gain").textContent = appreciationGainFormat;


    if (Number(document.getElementById("sellingcost").value) > 0) {
        SellingCost.call();
    };

    if (Number(document.getElementById("yrsbeforeselling").value) > 0) {
        ChangeYearsBeforeSelling.call();
    };
}



function SellingCost() {
    sellingCost = (Number(document.getElementById("sellingcost").value)) / 100;
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    homeAppreciation = (Number(document.getElementById("homeappreciation").value)) / 100;
    yearsBeforeSelling = Number(document.getElementById("yrsbeforeselling").value);
    stepOne = homeAppreciation + 1;
    stepTwo = stepOne ** yearsBeforeSelling;
    appreciatedPrice = rnd(homePriceNum * stepTwo);
    finalSelling = rnd(appreciatedPrice * sellingCost);
    finalSellingFormat = finalSelling.toLocaleString("en-US");
    document.getElementById("costtosell").textContent = finalSellingFormat;

    //test

    NetGainArr[2] = 0;
    investment = 0;
    NetGainArr[2] = finalSelling;
    investment = NetGainArr[0] - NetGainArr[1] + NetGainArr[2] + NetGainArr[3];
    netGain = AppreciatedPriceArr[0] - investment;
    netGainFormat = netGain.toLocaleString("en-US");
    document.getElementById("netgain").textContent = netGainFormat;
}



function ClosingCost() {
    closingCost = (Number(document.getElementById("closingcost").value)) / 100;
    homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
    homePriceNum = Number(homePrice);
    cost = rnd(homePriceNum * closingCost);

    //test

    NetGainArr[3] = 0;
    investment = 0;
    NetGainArr[3] = cost;
    investment = NetGainArr[0] - NetGainArr[1] + NetGainArr[2] + NetGainArr[3];
    netGain = AppreciatedPriceArr[0] - investment;
    netGainFormat = netGain.toLocaleString("en-US");
    document.getElementById("netgain").textContent = netGainFormat;
}



function ChangeYearsBeforeSelling() {

    if (Number(document.getElementById("yrsbeforeselling").value) > Number(document.getElementById("loanlength").value)) {
        document.getElementById("yrsbeforeselling").value = document.getElementById("loanlength").value;
        LoanLength.call();
    } // *********Newly added

    document.getElementById("table-year-to-sell").textContent = document.getElementById("yrsbeforeselling").value;
    if (Number(document.getElementById("rateincrease").value) > 0) {
        RentIncrease.call();
    };

    if (Number(document.getElementById("interest").value) > 0) {
        Interest.call();
    };

    if (Number(document.getElementById("homeappreciation").value) > 0) {
        homePrice = (document.getElementById("homeprice").value).replace(/\,/g, '');
        homePriceNum = Number(homePrice);
        homeAppreciation = (Number(document.getElementById("homeappreciation").value)) / 100;
        yearsBeforeSelling = Number(document.getElementById("yrsbeforeselling").value);
        stepOne = homeAppreciation + 1;
        stepTwo = stepOne ** yearsBeforeSelling;
        appreciatedPrice = rnd(homePriceNum * stepTwo);
        AppreciatedPriceArr[0] = 0;
        AppreciatedPriceArr[0] = appreciatedPrice;
        appreciatedPriceFormat = appreciatedPrice.toLocaleString("en-US");
        document.getElementById("appreciated-value").textContent = appreciatedPriceFormat;
        appreciationGain = rnd(appreciatedPrice - homePriceNum);
        appreciationGainFormat = appreciationGain.toLocaleString("en-US");
        document.getElementById("appreciated-gain").textContent = appreciationGainFormat;


        if (Number(document.getElementById("sellingcost").value) > 0) {
            SellingCost.call();
        };
    };

    if (Number(document.getElementById("taxincrease").value) > 0) {
        PropertyTaxIncrease.call();
    };
};
