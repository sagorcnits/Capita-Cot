const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#open");
const mainContent = document.querySelector(".mainContent");
const sidebar = document.querySelector(".sidebar");
const dashboard = document.querySelector("#dashboard");
const project = document.querySelector("#project");
const user = document.querySelector("#user");
const setting = document.querySelector("#setting");
const acount = document.querySelector("#acount");
const logout = document.querySelector("#logout");
const capita = document.querySelector("#capita");
const logo = document.querySelector("#logo");


closeBtn.addEventListener("click", () => {
    sidebar.style.width = "100px";
    logo.style.width = "100%";
    dashboard.style.display = "none";
    project.style.display = "none";
    user.style.display = "none";
    setting.style.display = "none";
    acount.style.display = "none";
    logout.style.display = "none";
    capita.style.display = "none";
    closeBtn.style.display = "none";
    openBtn.style.display = "inline-flex";
    mainContent.classList.add("active");
   
})

openBtn.addEventListener("click", () => {
    sidebar.style.width = "250px";
    mainContent.classList.remove("active");
     dashboard.style.display = "inline-flex";
     project.style.display = "inline-flex";
     user.style.display = "inline-flex";
     setting.style.display = "inline-flex";
     acount.style.display = "inline-flex";
     logout.style.display = "inline-flex";
     capita.style.display = "inline-flex";
     closeBtn.style.display = "inline-flex";
     openBtn.style.display = "none";
     logo.style.width = "45%";
})