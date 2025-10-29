/* add your code here */



document.addEventListener("DOMContentLoaded", function () {

  const stockList = JSON.parse(stockContent);
  const userListData = JSON.parse(userContent);

 
  const userSection = document.querySelector(".user-list");
  const portfolioSection = document.querySelector(".portfolio-list");
  const btnSave = document.querySelector("#save");
  const btnDelete = document.querySelector("#delete");

  // Initialize dashboard
  displayUsers(userListData);

  // Renders user names on the left list
  function displayUsers(users) {
    userSection.innerHTML = "";
    users.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.user.lastname}, ${item.user.firstname}`;
      li.dataset.userid = item.id;
      userSection.appendChild(li);
    });
  }

  // Handle clicking on a user
  userSection.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const chosenId = e.target.dataset.userid;
      const chosenUser = userListData.find(u => u.id == chosenId);
      fillUserForm(chosenUser);
      showPortfolio(chosenUser);
    }
  });

  // Populate user info form fields
  function fillUserForm(current) {
    const { id, user } = current;
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }

  // Display user portfolio stocks
  function showPortfolio(user) {
    portfolioSection.innerHTML = "";
    user.portfolio.forEach(stock => {
      const card = document.createElement("div");
      card.classList.add("stock-card");

      const ticker = document.createElement("p");
      ticker.textContent = stock.symbol;

      const shares = document.createElement("p");
      shares.textContent = stock.owned;

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View";
      viewBtn.dataset.ticker = stock.symbol;

      card.appendChild(ticker);
      card.appendChild(shares);
      card.appendChild(viewBtn);
      portfolioSection.appendChild(card);
    });
  }

  // When a stock view button is clicked
  portfolioSection.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const ticker = e.target.dataset.ticker;
      const stock = stockList.find(s => s.symbol === ticker);
      renderStockDetails(stock);
    }
  });

  // Display stock details in the info panel
  function renderStockDetails(stock) {
    document.querySelector("#stockName").textContent = stock.name;
    document.querySelector("#stockSector").textContent = stock.sector;
    document.querySelector("#stockIndustry").textContent = stock.subIndustry;
    document.querySelector("#stockAddress").textContent = stock.address;
    document.querySelector("#logo").src = `logos/${stock.symbol}.svg`;
  }

  // Save user modifications
  btnSave.addEventListener("click", function (e) {
    e.preventDefault();
    const idVal = document.querySelector("#userID").value;
    const targetUser = userListData.find(u => u.id == idVal);
    if (targetUser) {
      targetUser.user.firstname = document.querySelector("#firstname").value;
      targetUser.user.lastname = document.querySelector("#lastname").value;
      targetUser.user.address = document.querySelector("#address").value;
      targetUser.user.city = document.querySelector("#city").value;
      targetUser.user.email = document.querySelector("#email").value;
      displayUsers(userListData);
    }
  });

  // Delete selected user
  btnDelete.addEventListener("click", function (e) {
    e.preventDefault();
    const idVal = document.querySelector("#userID").value;
    const index = userListData.findIndex(u => u.id == idVal);
    if (index !== -1) {
      userListData.splice(index, 1);
      portfolioSection.innerHTML = "";
      clearUserForm();
      displayUsers(userListData);
    }
  });

  // Clears the form when a user is deleted
  function clearUserForm() {
    ["userID", "firstname", "lastname", "address", "city", "email"].forEach(id => {
      document.querySelector(`#${id}`).value = "";
    });
  }
});
