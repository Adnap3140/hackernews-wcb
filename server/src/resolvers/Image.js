function postedBy(parent, args, context) {
    return context.prisma.image
      .findUnique({ where: { id: parent.id } })
      .postedBy();
  }
  
  module.exports = {
    postedBy
  };
  