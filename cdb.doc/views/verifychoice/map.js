function (doc) {
  if (!doc.choice || !doc.choices.length) { return }
  emit([doc._id, doc.choice])
}
