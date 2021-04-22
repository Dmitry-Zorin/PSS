const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.rationalizationSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        authors: [{author: String}],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.researchSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{author: String}],
        // subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.developmentWorkSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{author: String}],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.projectsSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        authors: [{author: String}],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.thesisSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        authors: [{author: String}],
        subdivisions: [String],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.approbationSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        authors: [{author: String}],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.verificationSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creationDate: {
            type: Number,
            required: true
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
        headPerformer: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            required: true,
        },
        authors: [{author: String}],
        file: {
            type: String,
            required: true
        }
    },
    {versionKey: false}
)

exports.subdivisionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
    },
    {versionKey: false}
)

exports.publicationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
    },
    {versionKey: false}
)

exports.userSchema = new Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
    },
    {versionKey: false}
)

exports.departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        firstCreationDate: {
            type: Number,
            required: true
        },
    },
    {versionKey: false}
)