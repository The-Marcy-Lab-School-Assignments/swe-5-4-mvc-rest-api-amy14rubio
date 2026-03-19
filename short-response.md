# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
One design decision is that endpoints indicate **resources and not actions,** which means the same endpoint can be used with different HTTP methods to perform different operations. This communicates to the client developer that behavior **depends on the method** rather than changing the URL. Another design decision is the use of standard HTTP methods like **GET, POST, PATCH, and DELETE,** which map directly to CRUD operations such as retrieving, creating, updating, and deleting todos. This makes the API **predictable and easy to understand.** Another design decision is that the API returns **appropriate status codes** for each response, which helps the client understand whether a request was **successful** or if an **error** occurred.

---

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:
The problem of mixing data logic and request/response logic in a single file is that the code becomes **harder to debug and maintain** since multiple responsibilities are combined in one place. It can be confusing to figure out whether an issue is coming from how data is handled or how requests are processed. Separating them into a model and controller allows for a **clearer structure,** where the **model handles data and the controller handles HTTP logic.** This makes the code more readable and easier to update without affecting other parts. Overall, it **improves organization** and makes **development more efficient.**

---

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:
When the user clicks a checkbox to toggle the `isDone` field, the client sends a `PATCH` request to the `/api/todos/:id` endpoint. This request is handled by the `todoController.updateTodo` function. Inside the controller, the **id and updated data** are extracted from the request and passed to the `todoModel.update` function. The **model** updates the todo item in the data and returns the updated result. Finally, the **controller** sends back a response with a status code and the updated todo.

---

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1. Controller - this handles data coming from the HTTP request
2. Controller - this validates input and sends a response with a status code if there’s an error
3. Model - this creates a new todo object, which is part of data handling
4. Model - this updates the todos array, which belongs to the data layer
5. Controller - this sends the final HTTP response back to the client
