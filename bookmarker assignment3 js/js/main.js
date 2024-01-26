var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var tableBody = document.getElementById("tableBody");
var deleteBtn;
var visitBtn;
var closeBtn = document.getElementById("closeBtn");
var errorDialog = document.querySelector(".error-dialog");
var bookmarks = [];

if (localStorage.getItem("bookmarkContent")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarkContent"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

function displayBookmark(index) {
  var bookmarkURL = bookmarks[index].siteURL;
  var urlRegex = /^https?:\/\//g;
  if (urlRegex.test(bookmarkURL)) {
    testValidURL = bookmarkURL;
    finalURL = testValidURL
      .split("")
      .splice(testValidURL.match(urlRegex)[0].length)
      .join("");
  } else {
    var finalURL = bookmarkURL;
    testValidURL = `https://${bookmarkURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${index + 1}</td>
                <td>${bookmarks[index].siteName}</td>              
                <td>
                  <button class="btn visit-btn" data-index="${index}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn delete-btn pe-2" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableBody.innerHTML += newBookmark;

  deleteBtn = document.querySelectorAll(".delete-btn");
  if (deleteBtn) {
    for (var i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

  visitBtn = document.querySelectorAll(".visit-btn");
  if (visitBtn) {
    for (var j = 0; j < visitBtn.length; j++) {
      visitBtn[j].addEventListener("click", function (e) {
        visitSite(e);
      });
    }
  }
}

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

function capitalizeName(val) {
  let arrayName = val.split("");
  arrayName[0] = arrayName[0].toUpperCase();
  return arrayName.join("");
}

// =====> Submit Function

submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalizeName(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarkContent", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    errorDialog.classList.remove("d-none");
  }
});


function deleteBookmark(e) {
  tableBody.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarkContent", JSON.stringify(bookmarks));
}

function visitSite(e) {
  var websiteIndex = e.target.dataset.index;
  var urlRegex = /^https?:\/\//;
  if (urlRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validateRegex(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validateRegex(siteURL, urlRegex);
});

function validateRegex(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function closeModal() {
  errorDialog.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);