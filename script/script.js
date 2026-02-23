
let interviewList = [];
let rejectedList = [];
let currentStatus = "all-filter-btn";

const totalCount = document.getElementById("total");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const activeJobs = document.getElementById("active-jobs-count");

const allFilter = document.getElementById("all-filter-btn");
const interviewFilter = document.getElementById("interview-filter-btn");
const rejectedFilter = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const filteredSection = document.getElementById("filtered-section");
const noJobsSection = document.getElementById("noJobs")
const mainContainer = document.querySelector("main");



function getJobInfo(card) {
    const companyName = card.querySelector(".companyName").innerText.trim();
    const position = card.querySelector(".position").innerText.trim();
    const location = card.querySelector(".location").innerText.trim();
    const jobType = card.querySelector(".jobType").innerText.trim();
    const salary = card.querySelector(".salary").innerText.trim();
    const description = card.querySelector(".description").innerText.trim();

    return { companyName, position, location, jobType, salary, description };
}

function sameJob(a, b) {
    return a.companyName === b.companyName && a.position === b.position;
}

function upsert(list, item) {
    const exists = list.find((x) => sameJob(x, item));
    if (!exists) list.push(item);
}

function removeFrom(list, item) {
    return list.filter((x) => !sameJob(x, item));
}

function setActiveTab(id) {
    [allFilter, interviewFilter, rejectedFilter].forEach((btn) => {
        btn.classList.add("bg-white", "text-slate-600", "hover:bg-slate-100");
        btn.classList.remove("bg-blue-600", "text-white");
    });

    const selected = document.getElementById(id);
    selected.classList.remove("bg-white", "text-slate-600", "hover:bg-slate-100");
    selected.classList.add("bg-blue-600", "text-white");
}

function updateBadge(cardUpdate, statusUpdate) {
    const status = cardUpdate.querySelector(".statusText");

    if (statusUpdate === "INTERVIEW") {
        status.innerText = "INTERVIEW";
        status.className =
            "statusText px-3 py-2 text-[14px] font-medium rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200";
    } else if (statusUpdate === "REJECTED") {
        status.innerText = "REJECTED";
        status.className =
            "statusText px-3 py-2 text-[14px] font-medium rounded-md bg-rose-50 text-rose-700 border border-rose-200";
    } else {
        status.innerText = "NOT APPLIED";
        status.className =
            "statusText px-3 py-2 text-[14px] font-medium rounded-md bg-[#eef4ff] border border-slate-200";
    }
}

function calculateCount() {
    const totalCards = allCardSection.querySelectorAll(".card").length;

    totalCount.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === "all-filter-btn") activeJobs.innerText = totalCards;
    if (currentStatus === "interview-filter-btn") activeJobs.innerText = interviewList.length;
    if (currentStatus === "rejected-filter-btn") activeJobs.innerText = rejectedList.length;

}

function showOrHideNoJobs() {

    if (currentStatus === "all-filter-btn") {
        const totalCards = allCardSection.querySelectorAll(".card").length;
        if (totalCards === 0) {
            noJobsSection.classList.remove("hidden");
        } else {
            noJobsSection.classList.add("hidden");
        }
        return;
    }

    const count = currentStatus === "interview-filter-btn" ? interviewList.length : rejectedList.length;

    if (count === 0) {
        noJobsSection.classList.remove("hidden");
    } else {
        noJobsSection.classList.add("hidden");
    }

}

function toggleStyle(id) {
    currentStatus = id;

    setActiveTab(id);

    if (id === "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        filteredSection.classList.add("hidden");

        calculateCount();
        showOrHideNoJobs();
        return;
    }
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");

    if (id === "interview-filter-btn") {
        renderInterview();
    }

    if (id === "rejected-filter-btn") {
        renderRejected();
    }

    calculateCount();
    showOrHideNoJobs();
}

allFilter.addEventListener("click", () => toggleStyle("all-filter-btn"));
interviewFilter.addEventListener("click", () => toggleStyle("interview-filter-btn"));
rejectedFilter.addEventListener("click", () => toggleStyle("interview-filter-btn"));

function renderCardTemplate(item) {

    return `
    <div class="card bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
      <div class="flex items-start justify-between">
        <div class="min-w-0">
          <h3 class="companyName text-[18px] font-semibold">${item.companyName}</h3>
          <p class="position text-[16px] text-slate-600 mt-1">${item.position}</p>

          <p class="text-sm text-slate-500 mt-4">
            <span class="location">${item.location}</span> •
            <span class="jobType">${item.jobType}</span> •
            <span class="salary">${item.salary}</span>
          </p>

          <div class="mt-5">
            <span class="statusText px-3 py-2 text-[14px] font-medium rounded-md ${item.status === "INTERVIEW"
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-rose-50 text-rose-700 border border-rose-200"
        }">
              ${item.status}
            </span>
          </div>

          <p class="description text-sm text-gray-700 mt-4">${item.description}</p>

          <div class="mt-5 flex gap-3">
            <button class="interview-btn px-4 py-2 text-[14px] font-semibold rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition">
              INTERVIEW
            </button>
            <button class="rejected-btn px-4 py-2 text-[14px] font-semibold rounded-md border border-rose-300 text-rose-700 hover:bg-rose-100 transition">
              REJECTED
            </button>
          </div>
        </div>

        <button class="btn-delete group w-8 h-8 rounded-full border border-slate-200 hover:bg-rose-100 flex items-center justify-center transition" aria-label="Delete">
          <i class="fa-regular fa-trash-can text-slate-500 group-hover:text-rose-500 transition"></i>
        </button>
      </div>
    </div>
  `;
}

function renderInterview() {
    filteredSection.innerHTML = "";
    interviewList.forEach((item) => {
        filteredSection.insertAdjacentHTML("beforeend", renderCardTemplate(item));
    });
    calculateCount();
    showOrHideNoJobs();
}

function renderRejected() {
    filteredSection.innerHTML = "";
    rejectedList.forEach((item) => {
        filteredSection.insertAdjacentHTML("beforeend", renderCardTemplate(item));
    });

    calculateCount();
    showOrHideNoJobs();
}



