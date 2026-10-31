const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/server");

test("GET / should return API message", async () => {
    const response = await request(app).get("/");

    assert.strictEqual(response.status, 200);
    assert.ok(response.body.message);
});

test("GET /health should return Healthy", async () => {
    const response = await request(app).get("/health");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.status, "Healthy");
});

test("GET /api/students should return all students", async () => {
    const response = await request(app).get("/api/students");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 2);

    assert.deepStrictEqual(response.body[0], {
        id: 1,
        name: "Asif",
        rollNo: "23071A05A2"
    });

    assert.deepStrictEqual(response.body[1], {
        id: 2,
        name: "Akmal",
        rollNo: "23071A05A5"
    });
});

test("GET /api/students/1 should return Asif", async () => {
    const response = await request(app).get("/api/students/1");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.name, "Asif");
});

test("GET /api/students/99 should return 404", async () => {
    const response = await request(app).get("/api/students/99");

    assert.strictEqual(response.status, 404);
});

test("POST /api/students should add a student", async () => {
    const response = await request(app)
        .post("/api/students")
        .send({
            name: "Rahul",
            rollNo: "23071A05A6"
        });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.name, "Rahul");
});

test("POST /api/students should reject missing fields", async () => {
    const response = await request(app)
        .post("/api/students")
        .send({
            name: "Rahul"
        });

    assert.strictEqual(response.status, 400);
});