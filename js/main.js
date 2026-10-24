(function () {
  "use strict";

  var data = window.SITE_DATA || {};
  var LINKEDIN_PLACEHOLDER = "REPLACE_WITH_LINKEDIN_PROFILE_URL";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isLinkedInConfigured(url) {
    if (!url || url === LINKEDIN_PLACEHOLDER) {
      return false;
    }

    try {
      var parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch (error) {
      return false;
    }
  }

  function renderSkills() {
    var root = document.getElementById("skills-grid");
    if (!root || !Array.isArray(data.skillGroups)) {
      return;
    }

    root.innerHTML = data.skillGroups
      .map(function (group) {
        var items = (group.skills || [])
          .map(function (skill) {
            return (
              '<div class="skill-card">' +
              '<span class="skill-card__icon" aria-hidden="true">' +
              '<i class="' +
              escapeHtml(skill.icon) +
              '"></i>' +
              "</span>" +
              '<span class="skill-card__name">' +
              escapeHtml(skill.name) +
              "</span>" +
              "</div>"
            );
          })
          .join("");

        return (
          '<div class="col-12 col-md-6 col-lg-3">' +
          '<section class="skill-group" aria-label="' +
          escapeHtml(group.heading) +
          '">' +
          '<h3 class="skill-group__title">' +
          escapeHtml(group.heading) +
          "</h3>" +
          items +
          "</section>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderExperience() {
    var root = document.getElementById("experience-grid");
    if (!root || !Array.isArray(data.experience)) {
      return;
    }

    root.innerHTML = data.experience
      .map(function (item) {
        var responsibilities = (item.responsibilities || [])
          .map(function (line) {
            return "<li>" + escapeHtml(line) + "</li>";
          })
          .join("");

        return (
          '<div class="col-12">' +
          '<article class="experience-card">' +
          '  <h3 class="experience-card__role">' +
          escapeHtml(item.role) +
          "</h3>" +
          '  <p class="experience-card__org">' +
          escapeHtml(item.organization) +
          "</p>" +
          '  <ul class="experience-card__list">' +
          responsibilities +
          "</ul>" +
          "</article>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderPortfolio() {
    var root = document.getElementById("portfolio-grid");
    if (!root || !Array.isArray(data.portfolioProjects)) {
      return;
    }

    root.innerHTML = data.portfolioProjects
      .map(function (project) {
        return (
          '<div class="col-12 col-sm-6 col-lg-4">' +
          '<article class="portfolio-card">' +
          '  <div class="portfolio-card__media">' +
          '    <img class="portfolio-card__image" src="' +
          escapeHtml(project.image) +
          '" alt="' +
          escapeHtml(project.title) +
          '" width="800" height="600" loading="lazy">' +
          "  </div>" +
          '  <div class="portfolio-card__body">' +
          '    <p class="portfolio-card__category">' +
          escapeHtml(project.category) +
          "</p>" +
          '    <h3 class="portfolio-card__title">' +
          escapeHtml(project.title) +
          "</h3>" +
          '    <p class="portfolio-card__description">' +
          escapeHtml(project.description) +
          "</p>" +
          "  </div>" +
          "</article>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderCertifications() {
    var root = document.getElementById("certifications-grid");
    if (!root || !Array.isArray(data.certifications)) {
      return;
    }

    root.innerHTML = data.certifications
      .map(function (item) {
        return (
          '<div class="col-12 col-md-6">' +
          '<article class="cert-card">' +
          '  <div class="cert-card__icon" aria-hidden="true">' +
          '    <i class="fa-solid fa-award"></i>' +
          "  </div>" +
          '  <a href="' + escapeHtml(item.link) + '"><h3 class="cert-card__title">' +
          escapeHtml(item.title) +
          "</h3></a>" +
          '  <p class="cert-card__issuer">' +
          escapeHtml(item.issuer) +
          "</p>" +
          "</article>" +
          "</div>"
        );
      })
      .join("");
  }

  function setupLinkedIn() {
    var contact = data.contact || {};
    var configured = isLinkedInConfigured(contact.linkedinUrl);
    var slots = document.querySelectorAll(".linkedin-slot");

    slots.forEach(function (slot) {
      if (!configured) {
        slot.hidden = true;
        return;
      }

      var link = slot.querySelector("a[data-linkedin-href]");
      if (link) {
        link.href = contact.linkedinUrl;
      }
      slot.hidden = false;
    });
  }

  function setupFooterYear() {
    var yearNode = document.getElementById("copyright-year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  function setupNav() {
    var nav = document.getElementById("primaryNav");
    var links = document.querySelectorAll(".nav-link-site[href^='#']");
    var sections = ["home", "about", "skills", "experience", "portfolio", "contact"]
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    function setActive(id) {
      links.forEach(function (link) {
        var isCurrent = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function onScroll() {
      var fromTop = window.scrollY + 96;
      var current = sections[0] ? sections[0].id : "home";

      sections.forEach(function (section) {
        if (section.offsetTop <= fromTop) {
          current = section.id;
        }
      });

      setActive(current);
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav && nav.classList.contains("show") && window.bootstrap) {
          var collapse = window.bootstrap.Collapse.getInstance(nav) || new window.bootstrap.Collapse(nav, { toggle: false });
          collapse.hide();
        }
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupTogglerLabel() {
    var toggler = document.querySelector(".navbar-toggler-site");
    var nav = document.getElementById("primaryNav");
    if (!toggler || !nav) {
      return;
    }

    nav.addEventListener("shown.bs.collapse", function () {
      toggler.setAttribute("aria-label", "Close menu");
    });

    nav.addEventListener("hidden.bs.collapse", function () {
      toggler.setAttribute("aria-label", "Open menu");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSkills();
    renderExperience();
    renderPortfolio();
    renderCertifications();
    setupLinkedIn();
    setupFooterYear();
    setupNav();
    setupTogglerLabel();
  });
})();

AOS.init({
  duration:1200,
  once:true,
})



