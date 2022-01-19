function links(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
}

function images(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .images();
}

module.exports = {
  links,
  images
};
