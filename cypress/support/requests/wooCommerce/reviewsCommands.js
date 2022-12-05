Cypress.Commands.add('postReviewsWooCommerce', function (token, product_id, review, reviewer, email, rating) {
    cy.request({
        method: "POST",
        url: Cypress.env("wooCommerce") + Cypress.env("reviews"),
        headers: {
            Authorization: token,
            ContentType: "application/json"
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": email,
            "rating": rating
        }
    })
})

Cypress.Commands.add('putReviewsWooCommerce', function (token, id, review, rating, reviewer_email) {
    cy.request({
        method: "PUT",
        url: Cypress.env("wooCommerce") + Cypress.env("reviews") + `/${id}`,
        headers: {
            Authorization: token,
            ContentType: "application/json"
        },
        body: {
            "review": review,
            "rating": rating,
            "reviewer_email": reviewer_email
        }
    })
})

Cypress.Commands.add('deleteReviewsWooCommerce', function (token, id, force) {
    cy.request({
        method: "DELETE",
        url: Cypress.env("wooCommerce") + Cypress.env("reviews") + `/${id}` + `?force=${force}`,
        headers: {
            Authorization: token,
            ContentType: "application/json"
        }
    })
})

Cypress.Commands.add('gerarReviewsFixture', () => {
    const { faker } = require('@faker-js/faker');
    cy.writeFile('cypress/fixtures/reviews.json', {
        "reviewValido": {
            "product_id": 22,
            "review": faker.random.words(5),
            "reviewer": faker.name.fullName(),
            "reviewer_email": faker.internet.email(),
            "rating": faker.datatype.number({
                'min': 0,
                'max': 5
            })
        },
        "reviewEditar01": {
            "review": faker.random.words(6),
            "rating": faker.datatype.number({
                'min': 1,
                'max': 5
            }),
            "reviewer_email": faker.internet.email()
        },
        "reviewDeletar": {
            "force": true
        }
    })
})