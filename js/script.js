const linksData = {
    "Programming": [
        { name: "GitHub", url: "https://github.com", tags: ["code", "open-source"] },
        { name: "Stack Overflow", url: "https://stackoverflow.com", tags: ["q&a", "programming"] },
        // Add 1000+ links here!
    ],
    "Design": [
        { name: "Figma", url: "https://figma.com", tags: ["ui", "design"] },
        // ... more links
    ],
    // Add 50+ categories!
};

// Load all links
function loadLinks(category = null) {
    const container = document.getElementById('links-container');
    container.innerHTML = '';

    Object.entries(linksData).forEach(([categoryName, categoryLinks]) => {
        if (category && category !== categoryName) return;
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'link-card';
        categoryDiv.innerHTML = `
            <div class="link-header">
                <h2>${categoryName} (${categoryLinks.length} links)</h2>
            </div>
            <div class="link-grid">
                ${categoryLinks.map(link => `
                    <div class="link-item">
                        <a href="${link.url}" target="_blank">${link.name}</a>
                        ${link.tags.map(tag => `<span class="category-tag">${tag}</span>`).join('')}
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

// Search functionality
document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = {};
    
    Object.entries(linksData).forEach(([cat, links]) => {
        filtered[cat] = links.filter(link => 
            link.name.toLowerCase().includes(query) || 
            link.tags.some(tag => tag.includes(query))
        );
    });
    
    // Rebuild with filtered results
    linksDataFiltered = filtered;
    loadLinks();
});

// Initial load
loadLinks();

