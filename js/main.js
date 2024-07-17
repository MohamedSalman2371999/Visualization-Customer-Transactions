const customerFilter = document.getElementById("customerFilter");
const amountFilter = document.getElementById("amountFilter");
let customers = [
  {
    "id": 1,
    "name": "Ahmed Ali"
    },
    {
    "id": 2,
    "name": "Aya Elsayed"
    },
    
    {
    "id": 3,
    "name": "Mina Adel"
    },
    {
    "id": 4,
    "name": "Sarah Reda"
    },
    {
    "id": 5,
    "name": "Mohamed Sayed"
    }
];

let transactions = [
  {
    "id": 1,
    "customer_id": 1,
    "date": "2022-01-01",
    "amount": 1000
    },
    {
    "id": 2,
    "customer_id": 1,
    "date": "2022-01-02",
    "amount": 2000
    },
    {
    "id": 3,
    "customer_id": 2,
    "date": "2022-01-01",
    "amount": 550
    },
    {
    "id": 4,
    "customer_id": 3,
    "date": "2022-01-01",
    "amount": 500
    },
    {
    "id": 5,
    
    "customer_id": 2,
    "date": "2022-01-02",
    "amount": 1300
    },
    {
    "id": 6,
    "customer_id": 4,
    "date": "2022-01-01",
    "amount": 750
    },
    {
    "id": 7,
    "customer_id": 3,
    "date": "2022-01-02",
    "amount": 1250
    },
    {
    "id": 8,
    "customer_id": 5,
    "date": "2022-01-01",
    "amount": 2500
    },
    {
    "id": 9,
    "customer_id": 5,
    "date": "2022-01-02",
    "amount": 875
    }
];
let arrOfObjectName_Amount = [];
let arrOfObjectName = [];
let arrOfSumAmount = [];
// ========> Sort the objects by customer_id <===============
function getTransaction() {
  for (let i = 0; i < customers.length; i++) {
    for (let j = 0; j < transactions.length; j++) {
      if (customers[i].id === transactions[j].customer_id) {
        arrOfObjectName_Amount.push({
          customerName: customers[i].name,
          customerAmount: transactions[j].amount,
        });
        arrOfObjectName.push(customers[i].name);
      }
    }
  }
}
//////////////////////////////////////////////////////////////////
getTransaction();
console.log(arrOfObjectName_Amount);
let x = Array.from(new Set(arrOfObjectName));
// let arrwithoutrepet_ =new Set()
console.log(x);
let N_arr1 = [];
let N_arr2 = [];
// =========> Sum the amount of objects that have the same name <===============
function sumAmount() {
  for (let i = 0; i < x.length; i++) {
    let sum = 0;
    for (let j = 0; j < arrOfObjectName_Amount.length; j++) {
      if (x[i] === arrOfObjectName_Amount[j].customerName) {
        sum += arrOfObjectName_Amount[j].customerAmount;
      }
    }
    N_arr1.push({
      customerName: x[i],
      customerAmount: sum,
    });
  }
  return N_arr1;
}
function sumAmount2() {
  for (let i = 0; i < x.length; i++) {
    let arr = [];
    for (let j = 0; j < arrOfObjectName_Amount.length; j++) {
      if (x[i] === arrOfObjectName_Amount[j].customerName) {
        arr.push(arrOfObjectName_Amount[j].customerAmount);
      }
    }
    N_arr2.push({
      customerName: x[i],
      customerAmount: arr,
    });
  }
  return N_arr2;
}
//////////////////////////////////////////////////////////////////

let newSumData = sumAmount();
// console.log(newSumData);
let newSumData2 = sumAmount2();
console.log(newSumData2);
displayTable(N_arr1);
function displayTable(N_arr1) {
  let cartona = "";
  for (let i = 0; i < N_arr1.length; i++) {
    cartona += `
    <tr>
            <td>${N_arr1[i].customerName}</td>
            <td>${N_arr1[i].customerAmount} ==> { ${newSumData2[i].customerAmount} }</td>
            <td><button onclick="viewCustomerTransactions(${customers[i].id})">View </button></td>
    </tr>
          `;
  }
  document.getElementById("transactionTableBody").innerHTML = cartona;
}
// console.log(arrOfObjectName_Amount);
customerFilter.addEventListener("input", function () {
  filtterByName(this);
});
amountFilter.addEventListener("input", function () {
  filtterByAmount(this);
});
function filtterByName(customerinput) {
  let cartona = "";
  for (let i = 0; i < N_arr1.length; i++) {
    if (
      N_arr1[i].customerName
        .toLowerCase()
        .includes(customerinput.value.toLowerCase())
    ) {
      cartona += `
           <tr>
              <td>${N_arr1[i].customerName}</td>
              <td>${N_arr1[i].customerAmount}</td>
              <td><button onclick="viewCustomerTransactions(${customers[i].id})">View </button></td>
           </tr>
           `;
    }
  }
  document.getElementById("transactionTableBody").innerHTML = cartona;
}

function filtterByAmount(customerinput) {
  let cartona = "";
  for (let i = 0; i < N_arr1.length; i++) {
    if (String(N_arr1[i].customerAmount).includes(customerinput.value)) {
      cartona += `
          <tr>
                  <td>${N_arr1[i].customerName}</td>
                  <td>${N_arr1[i].customerAmount}</td>
                  <td><button onclick="viewCustomerTransactions(${customers[i].id})">View </button></td>
          </tr>
                `;
    }
  }
  document.getElementById("transactionTableBody").innerHTML = cartona;
}

function viewCustomerTransactions(x){ 
document.getElementById("ContainerOfmyChart").classList.remove('d-none');

// console.log(N_arr2[x-1].customerName);
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === x);
let arrOfDays =[]
const dates = customerTransactions.map(transaction => {
  const date = new Date(transaction.date);
  const date_= `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
  arrOfDays.push(date_)

});
// console.log(arrOfDays);
// console.log(customerTransactions);
// console.log(dates);

let ctx = document.getElementById("myChart").getContext('2d');
var mychart = Chart.getChart('myChart')
if(mychart){
  mychart.destroy();
}
mychart = new Chart(ctx, {
  type: "line",
  data: {
    labels: Array.from(new Set(arrOfDays)),
    datasets: [
      {
        label: `${N_arr2[x-1].customerName}'s Transactions`,
        data: N_arr2[x-1].customerAmount,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

}
