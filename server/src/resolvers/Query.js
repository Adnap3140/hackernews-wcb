async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
          { tag: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count
  };
}

async function userfeed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { name: { contains: args.filter } },
        ]
      }
    : {};

  const users = await context.prisma.user.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.user.count({ where });

  return {
    id: 'main-feed',
    users,
    count
  };
}

async function imagefeed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
          { tag: { contains: args.filter } }
        ]
      }
    : {};

  const images = await context.prisma.image.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.image.count({ where });

  return {
    id: 'main-feed',
    images,
    count
  };
}

module.exports = {
  userfeed,
  feed,
  imagefeed
};
