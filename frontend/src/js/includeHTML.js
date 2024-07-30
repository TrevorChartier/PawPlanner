document.addEventListener('DOMContentLoaded', includeAllHTML);

async function includeAllHTML() {
  try {
    await includeHTML('header-placeholder', '../src/components/header.html');
    await includeHTML('sidebar-placeholder', '../src/components/sidebar.html');
    await includeHTML('feed-placeholder', '../src/components/feed.html');
  } catch (error) {
    console.error('Error including HTML files:', error);
  }
}

async function includeHTML(placeholderId, filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.text();
    return (document.getElementById(placeholderId).innerHTML = data);
  } catch (error) {
    return console.error('Error loading HTML:', error);
  }
}
