/**
 * Sidebar scroll spy.
 * Marks the nav link for the section currently nearest the top of the viewport.
 * No animation, no transitions.
 */
(function () {
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.sidebar__link')
  );

  var sections = links
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  var activeLink = null;

  function setActive(link) {
    if (link === activeLink) return;
    if (activeLink) activeLink.classList.remove('is-active');
    link.classList.add('is-active');
    activeLink = link;

    // Keep the active item visible in a scrolled sidebar.
    var nav = document.getElementById('sidebarNav');
    if (!nav || nav.scrollHeight <= nav.clientHeight) return;

    var linkTop = link.offsetTop;
    var linkBottom = linkTop + link.offsetHeight;
    if (linkTop < nav.scrollTop) {
      nav.scrollTop = linkTop - 12;
    } else if (linkBottom > nav.scrollTop + nav.clientHeight) {
      nav.scrollTop = linkBottom - nav.clientHeight + 12;
    }
  }

  function update() {
    // The section whose top edge is closest to (but not far past) the marker line.
    var marker = 120;
    var current = sections[0];

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= marker) {
        current = sections[i];
      } else {
        break;
      }
    }

    // At the very bottom of the page, force the last section active so the
    // final short section is always reachable in the nav.
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 4
    ) {
      current = sections[sections.length - 1];
    }

    setActive(current.link);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
