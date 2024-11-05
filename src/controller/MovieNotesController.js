const knex = require("../database/knex");

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const [ movieNotesId ] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTags = tags.map(name => {
            return {
                notes_id: movieNotesId,
                user_id,
                name
            }
        });

        await knex("movie_tags").insert(movieTags);

        response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }
}

module.exports = MovieNotesController;