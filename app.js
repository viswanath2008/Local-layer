const providers = [
  {
    name: "Raj Plumbing Co.",
    category: "Plumber",
    location: "Chennai",
    responseConsistency: 92,
    completionRate: 95,
    punctuality: 88,
    disputeHistory: 4
  },
  {
    name: "Meera Home Tutors",
    category: "Tutor",
    location: "Bengaluru",
    responseConsistency: 90,
    completionRate: 91,
    punctuality: 93,
    disputeHistory: 3
  },
  {
    name: "Arun Design Freelance",
    category: "Freelancer",
    location: "Hyderabad",
    responseConsistency: 85,
    completionRate: 89,
    punctuality: 84,
    disputeHistory: 8
  }
];
const reviews = [
  {
    provider: "Raj Plumbing Co.",
    rating: 4.8,
    text: "Very responsive and arrived on time. Issue resolved in one visit.",
    context: "High completion rate matched review outcome"
  },
  {
    provider: "Meera Home Tutors",
    rating: 4.6,
    text: "Consistent classes and clear communication every week.",
    context: "Strong punctuality pattern over 3 months"
  },
  {
    provider: "Arun Design Freelance",
    rating: 4.2,
    text: "Good final work but delivery date slipped once.",
    context: "Minor punctuality variance reflected in trust signal"
  }
];
function trustScore(p) {
  const disputeAdjustment = Math.max(0, 100 - p.disputeHistory * 4);
  const weighted =
    p.responseConsistency * 0.3 +
    p.completionRate * 0.35 +
    p.punctuality * 0.25 +
    disputeAdjustment * 0.1;
  return Math.round(weighted);
}
function renderProviders() {
  const grid = document.getElementById("providerGrid");
  grid.innerHTML = providers
    .map((p) => {
      const score = trustScore(p);
      return `
        <article class="card">
          <h4>${p.name}</h4>
          <p class="meta">${p.category} � ${p.location}</p>
          <p class="score">Trust Score: ${score}/100</p>
          <p class="meta">Response consistency: ${p.responseConsistency}%</p>
          <p class="meta">Completion rate: ${p.completionRate}%</p>
          <p class="meta">Punctuality pattern: ${p.punctuality}%</p>
          <p class="meta">Dispute history index: ${p.disputeHistory}</p>
        </article>
      `;
    })
    .join("");
}
function renderReviews() {
  const list = document.getElementById("reviewList");
  list.innerHTML = reviews
    .map(
      (r) => `
      <article class="review">
        <strong>${r.provider}</strong>
        <p>Rating: ${r.rating} / 5</p>
        <p>"${r.text}"</p>
        <p class="meta">Signal context: ${r.context}</p>
      </article>
    `
    )
    .join("");
}
function wireTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      panels.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-hidden", "true");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const panel = document.getElementById(btn.dataset.tab);
      panel.classList.add("active");
      panel.setAttribute("aria-hidden", "false");
    });
  });
}
function wireSupportForm() {
  const form = document.getElementById("supportForm");
  const message = document.getElementById("supportMessage");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    message.textContent = `Thanks, ${name}. Your support request has been logged. Our team will contact you soon.`;
    form.reset();
  });
}
renderProviders();
renderReviews();
wireTabs();
wireSupportForm();
