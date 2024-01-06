EMPLOYES

  --- GET: /api/v1/employees
      sirve para obteer todos los empleados

  --- GET: /api/v1/employees/:employeeId
      sirve para obtener un empleado en particular apartir de su id

  --- POST: /api/v1/employee/new
      sirve para crear un nuevo empelado nuevo, los datos esperados son:

      const employe = {
        user: user,
        username: username,
        lastnames: lastnames,
        role: role,
        password: password,
      };
      
--- PATCH: /api/v1/employee/edit/:id
      sirve para editar un empleado ya almacenado en la base de datos, los datos esperados son 
      
      const employe = {
        user: user,
        username: username,
        lastnames: lastnames,
        role: role,
        password: password,
      };

--- DELETE: /api/v1/employee/delete/:id
     sirve para eliminar un empleado, se debera intriducir en la url del id del empleado a eliminar





PRODUCTS

  --- GET: /api/v1/products
      sirve para obtener todos los productos

  --- GET: /api/v1/products/:productId
      sirve para obtener un producto en particular, apartir de su id

  --- POST: /api/v1/products/new
      sirve para crear un nuevo producto, los datos esperados son:

      const dataProduct={
                nombre: nombre,
                descripcion:descripcion,
                precio:precio
            };
      
--- PATCH: /api/v1/products/edit/:productId
      sirve para editar un producto ya almacenado en la base de datos, los datos esperados son 
      
      const dataProduct={
                nombre: nombre,
                descripcion:descripcion,
                precio:precio
            };
            

--- DELETE: /api/v1/products/delete/:productId
     sirve para eliminar un producto, se debera intriducir en la url del id del empleado a eliminar






RUTAS

  --- GET: /api/v1/rutas
      sirve para obtener todos las rutas

  --- GET: /api/v1/rutas/:idRuta
      sirve para obtener una ruta en particular , apartir de su id

  --- POST: /api/v1/rutas/new
      sirve para crear una nueva ruta, los datos esperados son:

      const ruta = {
        empleado: empleado,
        vehicle: vehicle,
        start: start,     --> es un arreglo donde tiene 2 posiciones latitud longitud
        end: end,         --> es un arreglo donde tiene 2 posiciones latitud longitud
        status: status,
        amountOfMerchandise: amountOfMerchandise,
        LastMinuteSale: LastMinuteSale,
      };
      
--- PATCH: /api/v1/rutas/edit/:rutaId
      sirve para editar una ruta ya almacenado en la base de datos, los datos esperados son 
      
       const ruta = {
        empleado: empleado,
        vehicle: vehicle,
        start: start,     --> es un arreglo donde tiene 2 posiciones latitud longitud
        end: end,         --> es un arreglo donde tiene 2 posiciones latitud longitud
        status: status,
        amountOfMerchandise: amountOfMerchandise,
        LastMinuteSale: LastMinuteSale,
      };

--- DELETE: /api/v1/rutas/delete/:rutaId
     sirve para eliminar una ruta, se debera intriducir en la url del id del empleado a eliminar








CARS

  --- GET: /api/v1/cars-units
      sirve para obtener todos los autos

  --- POST: /api/v1/car-unit/new/
      sirve para crear un nuevo auto, los datos esperados son:

      const car = {
        marca: marca,
        modelo: modelo,
        lastOilChange: lastOilChange,
        nextOilChange: nextOilChange,
      };
      
--- PATCH: /api/v1/car-unit/edit/:id
      sirve para editar un auto ya almacenado en la base de datos, los datos esperados son 
      
       const car = {
        marca: marca,
        modelo: modelo,
        lastOilChange: lastOilChange,
        nextOilChange: nextOilChange,
      };

--- DELETE: /api/v1/car-unit/delete/:id`,
     sirve para eliminar un auto, se debera intriducir en la url del id del empleado a eliminar



     

      

  
  
