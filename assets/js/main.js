function toggleAccordion(id) {
    const content = document.getElementById(id);
    const isVisible = content.style.display === "block";
    content.style.display = isVisible ? "none" : "block";
}

