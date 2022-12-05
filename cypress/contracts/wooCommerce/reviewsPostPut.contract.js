const Joi = require('joi');

const reviewsSchemaPostPut = Joi.object({
    id: Joi.number().required(),
    date_created: Joi.date().iso().required(),
    date_created_gmt: Joi.date().iso().required(),
    product_id: Joi.number().required(),
    product_name: Joi.string().required(),
    product_permalink: Joi.string().required(),
    status: Joi.string().valid("approved", "hold", "spam", "unspam", "trash", "untrash").required(),
    reviewer: Joi.string().required(),
    reviewer_email: Joi.string().email({ tlds: { allow: false } }).required(),
    review: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
    verified: Joi.boolean().required(),
    reviewer_avatar_urls: Joi.object({
        24: Joi.string().uri().required(),
        48: Joi.string().uri().required(),
        96: Joi.string().uri().required()
    }),
    _links: Joi.object({
        self: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            })
        ),
        collection: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            })
        ),
        up: Joi.array().items(
            Joi.object({
                href: Joi.string().uri().required()
            })
        )
    })
}).required()

export default reviewsSchemaPostPut