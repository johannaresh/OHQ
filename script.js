// Enhanced activities data with deadlines, links, and extras
const activitiesData = {
    dubai: [
        {
            id: 1,
            name: "Tech Volunteer Program",
            description: "Assist in organizing tech workshops for youth.",
            tags: ["Technology", "Education"],
            payment: "voluntary",
            workMode: "in-person",
            target: "11th Grade",
            deadline: "2025-04-30",
            applyLink: "https://example.com/tech-volunteer",
            extraInfo: "You’ll be trained by industry mentors and provided with a certificate upon completion."
        },
        {
            id: 2,
            name: "Marketing Internship",
            description: "Internship opportunity in the marketing department.",
            tags: ["Marketing", "Business"],
            payment: "paid",
            workMode: "hybrid",
            target: "12th Grade",
            deadline: "2025-05-15",
            applyLink: "https://example.com/marketing-internship",
            extraInfo: "Requires basic knowledge of Canva or social media content planning."
        },
    ],
    vancouver: [
        {
            id: 3,
            name: "Environmental Research Assistant",
            description: "Assist in research projects related to environmental science.",
            tags: ["Environment", "Research"],
            payment: "paid",
            workMode: "remote",
            target: "9th Grade",
            deadline: "2025-06-01",
            applyLink: "https://example.com/environmental-research",
            extraInfo: "Work closely with university labs and get credited on published findings."
        },
        {
            id: 4,
            name: "Community Outreach Volunteer",
            description: "Engage with the community to promote local events.",
            tags: ["Community", "Events"],
            payment: "voluntary",
            workMode: "in-person",
            target: "Any Grade",
            deadline: "2025-04-10",
            applyLink: "https://example.com/community-outreach",
            extraInfo: "Ideal for students interested in public speaking and event planning."
        },
    ]
};

function getBookmarkedIds() {
    return JSON.parse(localStorage.getItem("bookmarkedActivities")) || [];
}

function toggleBookmark(id, icon) {
    let saved = getBookmarkedIds();
    if (saved.includes(id)) {
        saved = saved.filter(item => item !== id);
        icon.classList.remove("bookmarked");
        icon.innerHTML = "&#9734;";
    } else {
        saved.push(id);
        icon.classList.add("bookmarked");
        icon.innerHTML = "&#9733;";
    }
    localStorage.setItem("bookmarkedActivities", JSON.stringify(saved));
}

function toggleSvgBookmark(id, icon) {
    let saved = getBookmarkedIds();
    const svg = icon.querySelector("svg");
    if (saved.includes(id)) {
        saved = saved.filter(item => item !== id);
        icon.classList.remove("bookmarked");
        svg.setAttribute("fill", "none");
    } else {
        saved.push(id);
        icon.classList.add("bookmarked");
        svg.setAttribute("fill", "#1b1c5c");
    }
    localStorage.setItem("bookmarkedActivities", JSON.stringify(saved));
}


function createActivityCard(activity) {
    const card = document.createElement('div');
    card.classList.add('activity-card');

    const bookmark = document.createElement("span");
bookmark.classList.add("bookmark-icon");
bookmark.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#1b1c5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
`;

if (getBookmarkedIds().includes(activity.id)) {
    bookmark.classList.add("bookmarked");
    bookmark.querySelector("svg").setAttribute("fill", "#1b1c5c");
}

bookmark.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSvgBookmark(activity.id, bookmark);
});


    const title = document.createElement('h3');
    title.textContent = activity.name;

    const desc = document.createElement('p');
    desc.textContent = activity.description;

    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('activity-tags');
    activity.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
    });

    const details = document.createElement('div');
    details.classList.add('activity-details');
    details.innerHTML = `
        <p><strong>Payment:</strong> ${capitalize(activity.payment)}</p>
        <p><strong>Work Mode:</strong> ${capitalize(activity.workMode)}</p>
        <p><strong>Target:</strong> ${activity.target}</p>
    `;

    card.appendChild(bookmark);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsDiv);
    card.appendChild(details);

    card.addEventListener('click', () => openModal(activity));
    return card;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getUniqueTags() {
    const allTags = [...activitiesData.dubai, ...activitiesData.vancouver]
        .flatMap(activity => activity.tags);
    return [...new Set(allTags)];
}

function populateKeywordsCheckboxes() {
    const keywordsContainer = document.getElementById("keywords-checkboxes");
    const uniqueTags = getUniqueTags();
    keywordsContainer.innerHTML = "";

    uniqueTags.forEach(tag => {
        const label = document.createElement("label");
        label.classList.add("custom-checkbox");
        label.innerHTML = `<input type="checkbox" name="keywords" value="${tag.toLowerCase()}"> ${tag}`;
        keywordsContainer.appendChild(label);
    });
}

function attachKeywordCheckboxStyling() {
    const checkboxes = document.querySelectorAll('input[name="keywords"]');
    checkboxes.forEach(checkbox => {
        const label = checkbox.parentElement;

        function updateStyle() {
            if (checkbox.checked) {
                label.style.backgroundColor = '#49497d';
                label.style.color = '#ffffff';
                label.style.fontWeight = '600';
                label.style.borderRadius = '10px';
                label.style.padding = '10px 20px';
                label.style.transition = '0.3s';
            } else {
                label.style.backgroundColor = 'var(--color-bg)';
                label.style.color = 'var(--color-text)';
                label.style.fontWeight = '600';
                label.style.borderRadius = '10px';
                label.style.padding = '7px 11px';
            }
        }

        checkbox.addEventListener('change', updateStyle);
        updateStyle();
    });
}

function loadActivities() {
    const dubaiContainer = document.getElementById('dubai-activities');
    const vancouverContainer = document.getElementById('vancouver-activities');
    dubaiContainer.innerHTML = '';
    vancouverContainer.innerHTML = '';

    activitiesData.dubai.forEach(activity => {
        const card = createActivityCard(activity);
        dubaiContainer.appendChild(card);
    });

    activitiesData.vancouver.forEach(activity => {
        const card = createActivityCard(activity);
        vancouverContainer.appendChild(card);
    });
}

function applyFilters() {
    const selectedTags = Array.from(document.querySelectorAll('input[name="keywords"]:checked'))
        .map(el => el.value.toLowerCase());
    const paymentTypes = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(el => el.value);
    const workModes = Array.from(document.querySelectorAll('input[name="workMode"]:checked')).map(el => el.value);
    const target = document.getElementById('target').value;
    const showBookmarkedOnly = document.getElementById('bookmarked-only').checked;
    const bookmarkedIds = getBookmarkedIds();

    function filterActivities(activity) {
        if (showBookmarkedOnly && !bookmarkedIds.includes(activity.id)) return false;
        if (selectedTags.length > 0 && !selectedTags.some(tag => activity.tags.map(t => t.toLowerCase()).includes(tag))) return false;
        if (paymentTypes.length > 0 && !paymentTypes.includes(activity.payment)) return false;
        if (workModes.length > 0 && !workModes.includes(activity.workMode)) return false;
        if (target && activity.target !== target) return false;
        return true;
    }

    const dubaiContainer = document.getElementById('dubai-activities');
    dubaiContainer.innerHTML = '';
    activitiesData.dubai.filter(filterActivities).forEach(activity => {
        const card = createActivityCard(activity);
        dubaiContainer.appendChild(card);
    });

    const vancouverContainer = document.getElementById('vancouver-activities');
    vancouverContainer.innerHTML = '';
    activitiesData.vancouver.filter(filterActivities).forEach(activity => {
        const card = createActivityCard(activity);
        vancouverContainer.appendChild(card);
    });
}


function resetFilters() {
    document.getElementById('filter-form').reset();
    loadActivities();
    attachKeywordCheckboxStyling();
}

// === Modal Logic ===
function openModal(activity) {
    document.getElementById("modal-title").textContent = activity.name;
    document.getElementById("modal-description").textContent = activity.description;

    const tagsContainer = document.getElementById("modal-tags");
    tagsContainer.innerHTML = "";
    activity.tags.forEach(tag => {
        const tagEl = document.createElement("span");
        tagEl.className = "tag";
        tagEl.textContent = tag;
        tagsContainer.appendChild(tagEl);
    });

    document.getElementById("modal-details").innerHTML = `
        <p><strong>Payment:</strong> ${capitalize(activity.payment)}</p>
        <p><strong>Work Mode:</strong> ${capitalize(activity.workMode)}</p>
        <p><strong>Target:</strong> ${activity.target}</p>
    `;
    document.getElementById("modal-deadline").textContent = activity.deadline || "N/A";
    document.getElementById("modal-link").href = activity.applyLink || "#";
    document.getElementById("modal-link").textContent = "Apply Now";
    document.getElementById("modal-extra").textContent = activity.extraInfo || "";

    document.getElementById("activity-modal").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    populateKeywordsCheckboxes();
    attachKeywordCheckboxStyling();
    loadActivities();

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("activity-modal").classList.add("hidden");
    });

    document.getElementById("activity-modal").addEventListener("click", (e) => {
        if (e.target.id === "activity-modal") {
            document.getElementById("activity-modal").classList.add("hidden");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.getElementById("activity-modal").classList.add("hidden");
        }
    });
});
