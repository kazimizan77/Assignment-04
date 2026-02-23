
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
    console.log("calculateCount started");
    const totalCards = allCardSection.querySelectorAll(".card").length;

    totalCount.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === "all-filter-btn") activeJobs.innerText = totalCards;
    if (currentStatus === "interview-filter-btn") activeJobs.innerText = interviewList.length;
    if (currentStatus === "rejected-filter-btn") activeJobs.innerText = rejectedList.length;

    console.log("calculateCount()");
    console.log("Total Cards:", totalCards);
    console.log("Interview list:", interviewList.length);
    console.log("Rejected list:", rejectedList.length);
    console.log("Right side active Jobs:", activeJobs.innerText);
}



