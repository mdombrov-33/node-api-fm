import prisma from "../db";

//* Get all updates
export const getAllUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

//* Get one update
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

//* Create an update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    // product does not belong to user
    res.json({ error: "Product does not belong to user" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

//* Update an update
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const match = products.updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.json({ error: "Error" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

//* Delete an update
export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const match = products.updates.find((update) => update.id === req.params.id);
  if (!match) {
    res.json({ error: "Error" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
