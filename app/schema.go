package app

import (
	"encoding/json"
	"errors"
	"strconv"

	"github.com/graphql-go/graphql"
)

func findBooks(authorID int) []*Book {
	books := []*Book{}
	for _, book := range BookList.Books {
		if book.AuthorID == authorID {
			books = append(books, book)
		}
	}
	return books
}

// CreateScheme create graphql schema
func CreateScheme() (graphql.Schema, error) {
	Init()
	AuthorObject.AddFieldConfig("books", &graphql.Field{
		Type: graphql.NewList(BookObject),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			parent := p.Source.(*Author)
			books := findBooks(parent.ID)
			return books, nil
		},
	})
	rootQuery := graphql.Fields{
		"ping": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return "pong", nil
			},
		},
		"books": &graphql.Field{
			Type: graphql.NewList(BookObject),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return BookList.Books, nil
			},
		},
		"book": &graphql.Field{
			Type: BookObject,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type:        graphql.NewNonNull(graphql.ID),
					Description: "Book ID",
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, err := strconv.Atoi(p.Args["id"].(string))
				if err != nil {
					return nil, err
				}

				for _, book := range BookList.Books {
					if book.ID == id {
						return book, nil
					}
				}

				return nil, errors.New("Not Found")
			},
		},
		"author": &graphql.Field{
			Type: AuthorObject,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type:        graphql.NewNonNull(graphql.ID),
					Description: "Author ID",
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, err := strconv.Atoi(p.Args["id"].(string))
				if err != nil {
					return nil, err
				}

				for _, author := range AuthorList {
					if author.ID == id {
						return author, nil
					}
				}

				return nil, errors.New("Not Found")
			},
		},
		"authors": &graphql.Field{
			Type: graphql.NewList(AuthorObject),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return AuthorList, nil
			},
		},
	}

	rootMutation := graphql.Fields{
		"addBook": &graphql.Field{
			Type: BookObject,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type:        graphql.NewNonNull(graphql.ID),
					Description: "Book ID",
				},
				"name": &graphql.ArgumentConfig{
					Type:        graphql.String,
					Description: "Book name",
				},
				"authorID": &graphql.ArgumentConfig{
					Type:        graphql.ID,
					Description: "Book Author ID",
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, err := strconv.Atoi(p.Args["id"].(string))
				if err != nil {

					return nil, err
				}
				authorID, err := strconv.Atoi(p.Args["authorID"].(string))
				if err != nil {
					return nil, err
				}
				newBook := &Book{
					ID:       id,
					Name:     p.Args["name"].(string),
					AuthorID: authorID,
				}
				BookList.Books = append(BookList.Books, newBook)
				return newBook, nil
			},
		},
		"addAuthor": &graphql.Field{
			Type: AuthorObject,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type:        graphql.NewNonNull(graphql.ID),
					Description: "Author ID",
				},
				"name": &graphql.ArgumentConfig{
					Type:        graphql.String,
					Description: "Author name",
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, err := strconv.Atoi(p.Args["id"].(string))
				if err != nil {
					return nil, err
				}
				newAuthor := &Author{
					ID:   id,
					Name: p.Args["name"].(string),
				}
				AuthorList = append(AuthorList, newAuthor)
				return newAuthor, nil
			},
		},
	}

	return graphql.NewSchema(graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootQuery",
			Fields: rootQuery,
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "RootMutation",
			Fields: rootMutation,
		}),
	})
}

//Init initzilise data
func Init() {
	if err := json.Unmarshal([]byte(bookData), &BookList); err != nil {
		panic(err)
	}
	if err := json.Unmarshal([]byte(authorData), &AuthorList); err != nil {
		panic(err)
	}
}
