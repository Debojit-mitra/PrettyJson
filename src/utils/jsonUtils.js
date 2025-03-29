/**
 * Validates a JSON string and returns the parsed object or error
 * @param {string} jsonString - The JSON string to validate
 * @returns {Object} - Result object with validation status and parsed data or error
 */
export const validateJSON = (jsonString) => {
  if (!jsonString || typeof jsonString !== "string") {
    return {
      valid: false,
      error: "Please provide a valid JSON string",
      parsed: null,
    };
  }

  try {
    // Try to parse the JSON string
    const trimmed = jsonString.trim();
    const parsed = JSON.parse(trimmed);

    // Check if the parsed result is valid
    if (parsed === null) {
      return {
        valid: true,
        parsed: null,
        error: null,
      };
    }

    // Ensure it's an object or array
    if (typeof parsed !== "object") {
      return {
        valid: false,
        error: "Valid JSON but not an object or array",
        parsed: null,
      };
    }

    return {
      valid: true,
      parsed,
      error: null,
    };
  } catch (error) {
    // Get detailed error information
    let errorMessage = "Invalid JSON";

    // Extract position information if available
    if (error instanceof SyntaxError) {
      const match = error.message.match(/position\s+(\d+)/i);
      if (match && match[1]) {
        const position = parseInt(match[1]);
        const context = getErrorContext(jsonString, position);
        errorMessage = `${error.message}\n${context}`;
      } else {
        errorMessage = error.message;
      }
    }

    return {
      valid: false,
      error: errorMessage,
      parsed: null,
    };
  }
};

/**
 * Extract context around the error position to help in debugging
 * @param {string} json - The original JSON string
 * @param {number} position - The position where the error occurred
 * @returns {string} - Formatted context showing the error location
 */
const getErrorContext = (json, position) => {
  const start = Math.max(0, position - 20);
  const end = Math.min(json.length, position + 20);

  let before = json.substring(start, position);
  let after = json.substring(position, end);

  if (start > 0) before = "..." + before;
  if (end < json.length) after = after + "...";

  return `${before}→HERE←${after}`;
};

/**
 * Prettify a JSON string with proper indentation
 * @param {string|object} json - JSON string or object to prettify
 * @param {number} indent - Number of spaces for indentation
 * @returns {string} - Prettified JSON string
 */
export const prettifyJSON = (json, indent = 2) => {
  try {
    // If it's already an object, just stringify it
    if (typeof json === "object" && json !== null) {
      return JSON.stringify(json, null, indent);
    }

    // If it's a string, parse and then stringify
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    return json; // Return the original if there's an error
  }
};

/**
 * Minify a JSON string by removing all whitespace
 * @param {string|object} json - JSON string or object to minify
 * @returns {string} - Minified JSON string
 */
export const minifyJSON = (json) => {
  try {
    // If it's already an object, just stringify it without indentation
    if (typeof json === "object" && json !== null) {
      return JSON.stringify(json);
    }

    // If it's a string, parse and then stringify without indentation
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch (error) {
    return json; // Return the original if there's an error
  }
};
