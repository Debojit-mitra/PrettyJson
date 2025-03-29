/**
 * Generates HTML with syntax highlighting for JSON
 * @param {string} json - JSON string to highlight
 * @returns {string} - HTML with syntax highlighting
 */
export const highlightJSON = (json) => {
  if (!json) return "";

  try {
    const highlighted = json
      // Highlight keys
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      // Highlight string values (including empty strings)
      .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>')
      // Highlight numbers
      .replace(/: ([0-9]+\.?[0-9]*)/g, ': <span class="json-number">$1</span>')
      // Highlight booleans
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      // Highlight null
      .replace(/: (null)/g, ': <span class="json-null">$1</span>')
      // Add line breaks
      .replace(/\n/g, "<br>")
      // Add proper indentation - specifically target indentation spaces
      .replace(/ {2}/g, "&nbsp;&nbsp;");

    return highlighted;
  } catch (error) {
    console.error("Error highlighting JSON:", error);
    return json;
  }
};

/**
 * Get CSS for JSON highlighting based on theme
 * @param {string} mode - 'light' or 'dark' theme
 * @returns {string} - CSS styles for JSON highlighting
 */
export const getJSONHighlightStyles = (mode) => {
  if (mode === "dark") {
    return `
        .json-key { color: #F8C555; }
        .json-string { color: #7EC699; }
        .json-number { color: #F08D49; }
        .json-boolean { color: #CC99CD; }
        .json-null { color: #CC99CD; }
      `;
  }

  return `
      .json-key { color: #881391; }
      .json-string { color: #108040; }
      .json-number { color: #1C00CF; }
      .json-boolean { color: #1C00CF; }
      .json-null { color: #1C00CF; }
    `;
};
