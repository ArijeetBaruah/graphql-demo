package app

import (
	"errors"

	"github.com/graphql-go/graphql"
)

//Book structure for data
type Book struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	AuthorID int    `json:"authorID"`
}

//BookData store books data
type BookData struct {
	Books []*Book `json:"books"`
}

//BookList data books
var BookList BookData

//BookObject graphql object
var BookObject = graphql.NewObject(graphql.ObjectConfig{
	Name:        "book",
	Description: "Schema for all books",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type:        graphql.ID,
			Description: "book ID",
		},
		"name": &graphql.Field{
			Type:        graphql.String,
			Description: "book name",
		},
		"author": &graphql.Field{
			Type:        AuthorObject,
			Description: "book's author details",
			Resolve: func(param graphql.ResolveParams) (interface{}, error) {
				// key := "authorID"
				parent := param.Source.(*Book)
				for _, author := range AuthorList {
					if author.ID == parent.AuthorID {
						return author, nil
					}
				}
				return nil, errors.New("Not Found")
			},
		},
	},
})
