/**
 * Constructs a URL by adding a prefix and/or suffix to the given string.
 * @param {string} input - The base string to which the prefix/suffix will be added.
 * @param {string} [prefix=''] - The prefix to add to the input string.
 * @param {string} [suffix=''] - The suffix to add to the input string.
 * @returns {string} - The constructed URL.
 */
export default function GhLink(input, prefix = "", suffix = "") {
  return `${prefix}${input}${suffix}`;
}
