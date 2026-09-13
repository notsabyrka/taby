document.addEventListener("DOMContentLoaded", () => {
  const tabList = document.querySelector('[role="tablist"]');
  if (!tabList) return;

  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  const switchTab = (newTab) => {
    const targetPanelId = newTab.getAttribute("aria-controls");

    tabs.forEach((tab) => {
      const isActive = tab === newTab;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
      tab.classList.toggle("tabs__button--active", isActive);
    });

    panels.forEach((panel) => {
      const isTarget = panel.id === targetPanelId;
      panel.hidden = !isTarget;
      panel.classList.toggle("tabs__panel--active", isTarget);
    });

    newTab.focus();
  };

  tabList.addEventListener("click", (event) => {
    const clickedTab = event.target.closest('[role="tab"]');
    if (clickedTab) {
      switchTab(clickedTab);
    }
  });

  tabList.addEventListener("keydown", (event) => {
    const activeTab = document.activeElement;
    if (!tabs.includes(activeTab)) return;

    const index = tabs.indexOf(activeTab);
    let newIndex = null;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      newIndex = 0;
    } else if (event.key === "End") {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== null) {
      event.preventDefault();
      switchTab(tabs[newIndex]);
    }
  });
});
