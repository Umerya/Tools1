// Tool Categories
const categories = [
    {
        id: 'image-tools',
        name: 'Image Tools',
        icon: 'fas fa-image',
        tools: [
            { id: 'image-to-png', name: 'Image to PNG Converter', description: 'Convert images to PNG format' },
            { id: 'image-to-jpg', name: 'Image to JPG Converter', description: 'Convert images to JPG format' },
            { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to desired dimensions' },
            // Add more image tools...
        ]
    },
    {
        id: 'seo-tools',
        name: 'SEO Tools',
        icon: 'fas fa-search',
        tools: [
            { id: 'meta-tag-generator', name: 'Meta Tag Generator', description: 'Generate SEO meta tags' },
            { id: 'keyword-density', name: 'Keyword Density Checker', description: 'Check keyword density in text' },
            { id: 'sitemap-generator', name: 'Sitemap Generator', description: 'Generate XML sitemaps' },
            // Add more SEO tools...
        ]
    },
    // Add more categories...
];

// Load Header and Footer
async function loadComponents() {
    try {
        const headerResponse = await fetch('/components/header.html');
        const footerResponse = await fetch('/components/footer.html');
        
        const headerHtml = await headerResponse.text();
        const footerHtml = await footerResponse.text();
        
        document.getElementById('header-placeholder').innerHTML = headerHtml;
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Render Categories
function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = categories.map(category => `
        <div class="col-md-3 col-sm-6">
            <div class="category-card">
                <i class="${category.icon}"></i>
                <h5>${category.name}</h5>
                <p class="mb-0">${category.tools.length} tools</p>
                <a href="#${category.id}" class="btn btn-outline-primary mt-2">View Tools</a>
            </div>
        </div>
    `).join('');
}

// Render Tools
function renderTools() {
    const container = document.getElementById('tools-container');
    const allTools = categories.flatMap(category => category.tools);
    
    container.innerHTML = allTools.map(tool => `
        <div class="col-md-4 col-sm-6">
            <div class="card tool-card">
                <div class="card-body">
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                    <a href="/tools/${tool.id}.html" class="btn btn-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('toolSearch');
    const toolsContainer = document.getElementById('tools-container');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const allTools = categories.flatMap(category => category.tools);
        
        const filteredTools = allTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) || 
            tool.description.toLowerCase().includes(searchTerm)
        );
        
        toolsContainer.innerHTML = filteredTools.map(tool => `
            <div class="col-md-4 col-sm-6">
                <div class="card tool-card">
                    <div class="card-body">
                        <h5 class="card-title">${tool.name}</h5>
                        <p class="card-text">${tool.description}</p>
                        <a href="/tools/${tool.id}.html" class="btn btn-primary">Use Tool</a>
                    </div>
                </div>
            </div>
        `).join('');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    renderCategories();
    renderTools();
    setupSearch();
}); 