///<reference types="cypress" />
import tokenFixture from '../../fixtures/token.json';
import statusFixture from '../../fixtures/status.json';
import reviewsSchemaDelete from '../../contracts/wooCommerce/reviewsDelete.contract';
import reviewsSchemaPostPut from '../../contracts/wooCommerce/reviewsPostPut.contract';

describe('Product reviews - testes de contrato e aceitação', function () {
    beforeEach(() => {
        cy.gerarReviewsFixture()
        cy.fixture('reviews.json')
            .then(function (reviewsFixture) {
                this.reviewsFixture = reviewsFixture;
            })
    })

    it('Criar novo product review', function () {
        cy.postReviewsWooCommerce(
            tokenFixture.token,
            this.reviewsFixture.reviewValido.product_id,
            this.reviewsFixture.reviewValido.review,
            this.reviewsFixture.reviewValido.reviewer,
            this.reviewsFixture.reviewValido.reviewer_email,
            this.reviewsFixture.reviewValido.rating
        ).then((responsePost) => {
            expect(responsePost.status).to.be.eq(statusFixture.created)
            expect(responsePost.body.product_id).to.be.eq(this.reviewsFixture.reviewValido.product_id)
            expect(responsePost.body.review).to.be.eq(this.reviewsFixture.reviewValido.review)
            expect(responsePost.body.reviewer).to.be.eq(this.reviewsFixture.reviewValido.reviewer)
            expect(responsePost.body.reviewer_email).to.be.eq(this.reviewsFixture.reviewValido.reviewer_email)
            expect(responsePost.body.rating).to.be.eq(this.reviewsFixture.reviewValido.rating)
            return reviewsSchemaPostPut.validateAsync(responsePost.body),
                cy.deleteReviewsWooCommerce(
                    tokenFixture.token,
                    responsePost.body.id,
                    this.reviewsFixture.reviewDeletar.force)
        })
    })

    it('Editar product review', function () {
        cy.postReviewsWooCommerce(
            tokenFixture.token,
            this.reviewsFixture.reviewValido.product_id,
            this.reviewsFixture.reviewValido.review,
            this.reviewsFixture.reviewValido.reviewer,
            this.reviewsFixture.reviewValido.reviewer_email,
            this.reviewsFixture.reviewValido.rating
        ).then((responsePost) => {
            cy.putReviewsWooCommerce(
                tokenFixture.token,
                responsePost.body.id,
                this.reviewsFixture.reviewEditar01.review,
                this.reviewsFixture.reviewEditar01.rating,
                this.reviewsFixture.reviewEditar01.reviewer_email
            ).then((responsePut) => {
                expect(responsePut.status).to.be.eq(statusFixture.OK)
                expect(responsePut.body.review).to.be.eq(this.reviewsFixture.reviewEditar01.review)
                expect(responsePut.body.rating).to.be.eq(this.reviewsFixture.reviewEditar01.rating)
                expect(responsePut.body.reviewer_email).to.be.eq(this.reviewsFixture.reviewEditar01.reviewer_email)
                return reviewsSchemaPostPut.validateAsync(responsePut.body),
                    cy.deleteReviewsWooCommerce(
                        tokenFixture.token,
                        responsePut.body.id,
                        this.reviewsFixture.reviewDeletar.force)
            })
        })
    })

    it('Deletar product review', function () {
        cy.postReviewsWooCommerce(
            tokenFixture.token,
            this.reviewsFixture.reviewValido.product_id,
            this.reviewsFixture.reviewValido.review,
            this.reviewsFixture.reviewValido.reviewer,
            this.reviewsFixture.reviewValido.reviewer_email,
            this.reviewsFixture.reviewValido.rating
        ).then((responsePost) => {
            cy.deleteReviewsWooCommerce(
                tokenFixture.token,
                responsePost.body.id,
                this.reviewsFixture.reviewDeletar.force
            ).then((responseDelete) => {
                expect(responseDelete.status).to.be.eq(statusFixture.OK)
                expect(responseDelete.body.deleted).to.eq(true)
                expect(responseDelete.body.previous.product_id).to.be.eq(this.reviewsFixture.reviewValido.product_id)
                expect(responseDelete.body.previous.review).to.be.eq(this.reviewsFixture.reviewValido.review)
                expect(responseDelete.body.previous.reviewer).to.be.eq(this.reviewsFixture.reviewValido.reviewer)
                expect(responseDelete.body.previous.reviewer_email).to.be.eq(this.reviewsFixture.reviewValido.reviewer_email)
                expect(responseDelete.body.previous.rating).to.be.eq(this.reviewsFixture.reviewValido.rating)
                return reviewsSchemaDelete.validateAsync(responseDelete.body)
            })
        })
    })
})