// Placeholder activities data
const activitiesData = {
    dubai: [
        {
            id: 1,
            name: "Tech Volunteer Program",
            description: "Assist in organizing tech workshops for youth.",
            tags: ["Technology", "Education"],
            payment: "voluntary",
            workMode: "in-person",
            target: "11th Grade"
        },
        {
            id: 2,
            name: "Marketing Internship",
            description: "Internship opportunity in the marketing department.",
            tags: ["Marketing", "Business"],
            payment: "paid",
            workMode: "hybrid",
            target: "12th Grade"
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
            target: "9th Grade"
        },
        {
            id: 4,
            name: "Community Outreach Volunteer",
            description: "Engage with the community to promote local events.",
            tags: ["Community", "Events"],
            payment: "voluntary",
            workMode: "in-person",
            target: "Any Grade"
        },
    ]
};

// Function to create activity cards
function createActivityCard(activity) {
    const card = document.createElement('div');
    card.classList.add('activity-card');

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

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsDiv);
    card.appendChild(details);

    return card;
}

// Function to capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to extract unique tags
function getUniqueTags() {
    const allTags = [...activitiesData.dubai, ...activitiesData.vancouver]
        .flatMap(activity => activity.tags);
    return [...new Set(allTags)];
}

// Populate keyword checkboxes dynamically
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

// Attach styling to dynamically created keyword checkboxes
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
        updateStyle(); // Initial render
    });
}

// Load all activities
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

// Apply filters
function applyFilters() {
    const selectedTags = Array.from(document.querySelectorAll('input[name="keywords"]:checked'))
        .map(el => el.value.toLowerCase());
    const paymentTypes = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(el => el.value);
    const workModes = Array.from(document.querySelectorAll('input[name="workMode"]:checked')).map(el => el.value);
    const target = document.getElementById('target').value;

    function filterActivities(activity) {
        if (selectedTags.length > 0 && !selectedTags.some(tag => activity.tags.map(t => t.toLowerCase()).includes(tag))) {
            return false;
        }
        if (paymentTypes.length > 0 && !paymentTypes.includes(activity.payment)) {
            return false;
        }
        if (workModes.length > 0 && !workModes.includes(activity.workMode)) {
            return false;
        }
        if (target && activity.target !== target) {
            return false;
        }
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

// Reset filters
function resetFilters() {
    document.getElementById('filter-form').reset();
    loadActivities();
    attachKeywordCheckboxStyling(); // Reapply styling
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    populateKeywordsCheckboxes();
    attachKeywordCheckboxStyling(); // After checkboxes are inserted
    loadActivities();
});

document.getElementById('apply-filters').addEventListener('click', applyFilters);
document.getElementById('reset-filters').addEventListener('click', resetFilters);
