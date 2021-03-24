const validators = {
  stringNotEmpty: val => {
    return typeof val === 'string' && val.length > 0;
  },
  email: val => {
    if(typeof val !== 'string') return false;
    const re = /\S+@\S+\.\S+/;
    return re.test(val);
  },
  digitBetween: (val, min, max) => {
    return typeof val === 'number' && val >= min && val <= max;
  }
}

const allowedFields = {
  id: true,
  title: true,
  email: true,
  content: true,
  priority: true,
  closedAt: true,
  createdAt: true
}

const handler = prisma => async (req, res, next) => {
  let { id } = req.params;
  if(typeof id === 'string') id = parseInt(id);
  const { take, skip, orderBy } = req.params;
  const { title, email, content, priority } = req.body;
  try {
    switch(req.method){
      case 'GET':
        if(typeof id === 'number'){
          return res.json(await prisma.ticket.findUnique({ where: { id } }));
        } else { 
          return res.json(await prisma.ticket.findMany({
            take, 
            skip, 
            orderBy
          }));
        }    
        break;
      case 'POST':
        if(validators['stringNotEmpty'](title) && validators['email'](email) && validators['stringNotEmpty'](content) && validators['digitBetween'](priority, 1, 5)){
          const createdTicket = await prisma.ticket.create({
            data: { title, email, content, priority, createdAt: new Date() },
            select: allowedFields
          });
          return res.json(createdTicket)
        } else {
          return res.sendStatus(400);
        }
        break;
      case 'PATCH':
        if( typeof id !== 'number' ||
          (!!title && !validators['stringNotEmpty'](title)) ||
          (!!email && !validators['email'](email)) ||
          (!!content && !validators['stringNotEmpty'](content)) || 
          (!!priority && !validators['digitBetween'](priority, 1, 5))
        ) {
          return res.sendStatus(400);
        }
        const updateUser = await prisma.ticket.update({
          where: {
            id
          },
          data: {
            title, 
            email, 
            content, 
            priority 
          },
          select: allowedFields
        })
        return res.json(updateUser);
        break;
      case 'DELETE':
        if(typeof id !== 'number') {
          return res.sendStatus(400);
        }
        const ticketUpdate = await prisma.ticket.update({
          where: { 
            id
          },
          data: {
            closedAt: new Date()
          }
        })
        return res.json(ticketUpdate);
        break;
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
  next();
}

module.exports = { handler }