// script.js

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
        // Add more placeholder activities as needed
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
        // Add more placeholder activities as needed
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

// Function to load activities into the DOM
function loadActivities() {
    const dubaiContainer = document.getElementById('dubai-activities');
    const vancouverContainer = document.getElementById('vancouver-activities');

    // Clear existing activities
    dubaiContainer.innerHTML = '';
    vancouverContainer.innerHTML = '';

    // Load Dubai activities
    activitiesData.dubai.forEach(activity => {
        const card = createActivityCard(activity);
        dubaiContainer.appendChild(card);
    });

    // Load Vancouver activities
    activitiesData.vancouver.forEach(activity => {
        const card = createActivityCard(activity);
        vancouverContainer.appendChild(card);
    });
}

// Function to apply filters
function applyFilters() {
    const keywords = document.getElementById('keywords').value.toLowerCase();
    const paymentTypes = Array.from(document.querySelectorAll('input[name="payment"]:checked')).map(el => el.value);
    const workModes = Array.from(document.querySelectorAll('input[name="workMode"]:checked')).map(el => el.value);
    const target = document.getElementById('target').value;

    // Function to filter activities
    function filterActivities(activity) {
        // Keywords/Tags Filter
        if (keywords) {
            const tagsMatch = activity.tags.some(tag => tag.toLowerCase().includes(keywords));
            const nameMatch = activity.name.toLowerCase().includes(keywords);
            if (!tagsMatch && !nameMatch) return false;
        }

        // Payment Type Filter
        if (paymentTypes.length > 0 && !paymentTypes.includes(activity.payment)) {
            return false;
        }

        // Work Mode Filter
        if (workModes.length > 0 && !workModes.includes(activity.workMode)) {
            return false;
        }

        // Target Grade/Age Filter
        if (target && activity.target !== target) {
            return false;
        }

        return true;
    }

    // Filter and display Dubai activities
    const dubaiContainer = document.getElementById('dubai-activities');
    dubaiContainer.innerHTML = '';
    activitiesData.dubai.filter(filterActivities).forEach(activity => {
        const card = createActivityCard(activity);
        dubaiContainer.appendChild(card);
    });

    // Filter and display Vancouver activities
    const vancouverContainer = document.getElementById('vancouver-activities');
    vancouverContainer.innerHTML = '';
    activitiesData.vancouver.filter(filterActivities).forEach(activity => {
        const card = createActivityCard(activity);
        vancouverContainer.appendChild(card);
    });
}

// Function to reset filters
function resetFilters() {
    document.getElementById('filter-form').reset();
    loadActivities();
}

// Event listeners
document.getElementById('apply-filters').addEventListener('click', applyFilters);
document.getElementById('reset-filters').addEventListener('click', resetFilters);

// Initialize the page by loading activities
document.addEventListener('DOMContentLoaded', loadActivities);

