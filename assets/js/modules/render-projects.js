import { spotlightProject, featuredProjects, otherProjects } from "../data/projects.js";

const spotlightSlot = document.querySelector("[data-spotlight-project]");
const featuredGrid = document.querySelector("[data-featured-projects]");
const otherGrid = document.querySelector("[data-other-projects]");
const dialog = document.getElementById("project-dialog");

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function linkIconButton(href, label, iconClass) {
  return `<a class="icon-btn" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(
    label
  )}"><i class="${iconClass}" aria-hidden="true"></i></a>`;
}

function badges(stack) {
  return stack.map((tech) => `<span class="badge">${escapeHtml(tech)}</span>`).join("");
}

/** Single full-width showcase card for `spotlightProject` — shows everything inline, no dialog. */
function spotlightCard(project) {
  const el = document.createElement("article");
  el.className = "card project-spotlight";
  el.setAttribute("data-reveal", "");
  const repoLinks = (project.repos || [])
    .map(
      (repo, i) =>
        `<a class="btn ${i === 0 ? "btn--primary" : "btn--ghost"} btn--sm" href="${repo.href}" target="_blank" rel="noopener noreferrer">${escapeHtml(
          repo.label
        )}</a>`
    )
    .join("");

  el.innerHTML = `
    <div class="project-spotlight__header">
      <span class="project-card__mark" aria-hidden="true">${escapeHtml(project.mark)}</span>
      <div>
        <span class="project-card__status">${escapeHtml(project.period)} · ${escapeHtml(project.status)}</span>
        <h3>${escapeHtml(project.name)}</h3>
        <p class="project-card__role">${escapeHtml(project.tagline)}</p>
      </div>
    </div>
    <div class="project-spotlight__body">
      <div class="project-spotlight__text">
        <p class="project-card__summary">${escapeHtml(project.summary)}</p>
        <p class="project-card__summary"><strong>Minha participação:</strong> ${escapeHtml(project.role)}</p>
        <div class="badge-group">${badges(project.stack)}</div>
      </div>
      <ul class="project-card__list">
        ${project.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
      </ul>
    </div>
    <div class="project-spotlight__footer">${repoLinks}</div>
  `;
  return el;
}

/** Rich card used for `featuredProjects`. */
function featuredCard(project) {
  const article = document.createElement("article");
  article.className = "card project-card";
  article.setAttribute("data-reveal", "");
  article.innerHTML = `
    <div class="project-card__media">
      <span class="project-card__mark" aria-hidden="true">${escapeHtml(project.mark)}</span>
      <span class="project-card__status">${escapeHtml(project.period)} · ${escapeHtml(project.status)}</span>
    </div>
    <div class="project-card__body">
      <h3>${escapeHtml(project.name)}</h3>
      <p class="project-card__role">${escapeHtml(project.tagline)}</p>
      <p class="project-card__summary">${escapeHtml(project.summary)}</p>
      <ul class="project-card__list">
        ${project.highlights
          .slice(0, 3)
          .map((h) => `<li>${escapeHtml(h)}</li>`)
          .join("")}
      </ul>
      <div class="badge-group">${badges(project.stack)}</div>
      <div class="project-card__footer">
        <div class="project-card__links">
          ${linkIconButton(project.links.github, `Ver código de ${project.name} no GitHub`, "icon-github")}
        </div>
        <button class="btn btn--ghost btn--sm" type="button" data-project-detail="${project.id}">
          Detalhes <i class="icon-forward" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  `;
  return article;
}

/** Compact card used for `otherProjects`. */
function compactCard(project) {
  const article = document.createElement("article");
  article.className = "card project-card project-card--compact";
  article.setAttribute("data-reveal", "");
  const demoLink = project.links.demo
    ? linkIconButton(project.links.demo, `Ver demo de ${project.name}`, "icon-forward")
    : "";
  article.innerHTML = `
    <div class="project-card__media">
      <span class="project-card__mark" aria-hidden="true">${escapeHtml(project.mark)}</span>
      <span class="project-card__status">${escapeHtml(project.period)}</span>
    </div>
    <div class="project-card__body">
      <h3>${escapeHtml(project.name)}</h3>
      <p class="project-card__summary">${escapeHtml(project.summary)}</p>
      <div class="badge-group">${badges(project.stack)}</div>
      <div class="project-card__footer">
        <div class="project-card__links">
          ${linkIconButton(project.links.github, `Ver código de ${project.name} no GitHub`, "icon-github")}
          ${demoLink}
        </div>
      </div>
    </div>
  `;
  return article;
}

function openDialog(id, trigger) {
  const project = featuredProjects.find((p) => p.id === id);
  if (!project || !dialog) return;

  dialog.querySelector("#project-dialog-period").textContent = `${project.period} · ${project.status}`;
  dialog.querySelector("#project-dialog-title").textContent = project.name;
  dialog.querySelector("#project-dialog-summary").textContent = project.summary;
  dialog.querySelector("#project-dialog-role").textContent = project.role;
  dialog.querySelector("#project-dialog-highlights").innerHTML = project.highlights
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join("");
  dialog.querySelector("#project-dialog-stack").innerHTML = badges(project.stack);

  let linksHtml = `<a class="btn btn--primary btn--sm" href="${project.links.github}" target="_blank" rel="noopener noreferrer"><i class="icon-github" aria-hidden="true"></i> Ver código</a>`;
  if (project.links.demo) {
    linksHtml += `<a class="btn btn--ghost btn--sm" href="${project.links.demo}" target="_blank" rel="noopener noreferrer"><i class="icon-forward" aria-hidden="true"></i> Ver demo</a>`;
  }
  dialog.querySelector("#project-dialog-links").innerHTML = linksHtml;

  dialog._trigger = trigger;
  dialog.showModal();
}

function initDialog() {
  if (!dialog) return;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-detail]");
    if (trigger) {
      openDialog(trigger.getAttribute("data-project-detail"), trigger);
    }
  });

  dialog.querySelectorAll("[data-dialog-close]").forEach((btn) => {
    btn.addEventListener("click", () => dialog.close());
  });

  // Click on the ::backdrop (outside the inner panel) closes the dialog.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (dialog._trigger) dialog._trigger.focus();
  });
}

export function initProjects() {
  if (spotlightSlot) {
    spotlightSlot.appendChild(spotlightCard(spotlightProject));
  }
  if (featuredGrid) {
    featuredProjects.forEach((project) => featuredGrid.appendChild(featuredCard(project)));
  }
  if (otherGrid) {
    otherProjects.forEach((project) => otherGrid.appendChild(compactCard(project)));
  }
  initDialog();
}
