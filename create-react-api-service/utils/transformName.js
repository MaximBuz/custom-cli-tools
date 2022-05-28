module.exports = function transformName (name) {
  return String(name[0].toUpperCase() + name.slice(1))
}