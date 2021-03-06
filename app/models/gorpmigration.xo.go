// Package models contains the types for schema 'public'.
package models

// Code generated by xo. DO NOT EDIT.

import (
	"github.com/lib/pq"
)

// GorpMigration represents a row from 'public.gorp_migrations'.
type GorpMigration struct {
	ID        string      `json:"id"`         // id
	AppliedAt pq.NullTime `json:"applied_at"` // applied_at

	_exists, _deleted bool
}

type GorpMigrationService interface {
	DoesGorpMigrationExists(gm *GorpMigration) (bool, error)
	InsertGorpMigration(gm *GorpMigration) error
	UpdateGorpMigration(gm *GorpMigration) error
	UpsertGorpMigration(gm *GorpMigration) error
	DeleteGorpMigration(gm *GorpMigration) error
	GetAllGorpMigrations() ([]*GorpMigration, error)
	GetChunkedGorpMigrations(limit int, offset int) ([]*GorpMigration, error)
}

type GorpMigrationServiceImpl struct {
	DB XODB
}

// Exists determines if the GorpMigration exists in the database.
func (serviceImpl *GorpMigrationServiceImpl) DoesGorpMigrationExists(gm *GorpMigration) (bool, error) {
	panic("not yet implemented")
}

// Insert inserts the GorpMigration to the database.
func (serviceImpl *GorpMigrationServiceImpl) InsertGorpMigration(gm *GorpMigration) error {
	var err error

	// sql insert query, primary key must be provided
	const sqlstr = `INSERT INTO public.gorp_migrations (` +
		`id, applied_at` +
		`) VALUES (` +
		`$1, $2` +
		`)`

	// run query
	XOLog(sqlstr, gm.ID, gm.AppliedAt)
	err = serviceImpl.DB.QueryRow(sqlstr, gm.ID, gm.AppliedAt).Scan(&gm.ID)
	if err != nil {
		return err
	}

	return nil
}

// Update updates the GorpMigration in the database.
func (serviceImpl *GorpMigrationServiceImpl) UpdateGorpMigration(gm *GorpMigration) error {
	var err error

	// sql query
	const sqlstr = `UPDATE public.gorp_migrations SET (` +
		`applied_at` +
		`) = ( ` +
		`$1` +
		`) WHERE id = $2`

	// run query
	XOLog(sqlstr, gm.AppliedAt, gm.ID)
	_, err = serviceImpl.DB.Exec(sqlstr, gm.AppliedAt, gm.ID)
	return err
}

// Save saves the GorpMigration to the database.
/*
	func (gm *GorpMigration) Save(db XODB) error {
		if gm.Exists() {
			return gm.Update(db)
		}

		return gm.Insert(db)
	}
*/

// Upsert performs an upsert for GorpMigration.
//
// NOTE: PostgreSQL 9.5+ only
func (serviceImpl *GorpMigrationServiceImpl) UpsertGorpMigration(gm *GorpMigration) error {
	var err error

	// sql query
	const sqlstr = `INSERT INTO public.gorp_migrations (` +
		`id, applied_at` +
		`) VALUES (` +
		`$1, $2` +
		`) ON CONFLICT (id) DO UPDATE SET (` +
		`id, applied_at` +
		`) = (` +
		`EXCLUDED.id, EXCLUDED.applied_at` +
		`)`

	// run query
	XOLog(sqlstr, gm.ID, gm.AppliedAt)
	_, err = serviceImpl.DB.Exec(sqlstr, gm.ID, gm.AppliedAt)
	if err != nil {
		return err
	}

	return nil
}

// Delete deletes the GorpMigration from the database.
func (serviceImpl *GorpMigrationServiceImpl) DeleteGorpMigration(gm *GorpMigration) error {
	var err error

	// sql query
	const sqlstr = `DELETE FROM public.gorp_migrations WHERE id = $1`

	// run query
	XOLog(sqlstr, gm.ID)
	_, err = serviceImpl.DB.Exec(sqlstr, gm.ID)
	if err != nil {
		return err
	}

	return nil
}

// GetAllGorpMigrations returns all rows from 'public.gorp_migrations',
// ordered by "created_at" in descending order.
func (serviceImpl *GorpMigrationServiceImpl) GetAllGorpMigrations() ([]*GorpMigration, error) {
	const sqlstr = `SELECT ` +
		`*` +
		`FROM public.gorp_migrations`

	q, err := serviceImpl.DB.Query(sqlstr)
	if err != nil {
		return nil, err
	}
	defer q.Close()

	// load results
	var res []*GorpMigration
	for q.Next() {
		gm := GorpMigration{}

		// scan
		err = q.Scan(&gm.ID, &gm.AppliedAt)
		if err != nil {
			return nil, err
		}

		res = append(res, &gm)
	}

	return res, nil
}

// GetChunkedGorpMigrations returns pagingated rows from 'public.gorp_migrations',
// ordered by "created_at" in descending order.
func (serviceImpl *GorpMigrationServiceImpl) GetChunkedGorpMigrations(limit int, offset int) ([]*GorpMigration, error) {
	const sqlstr = `SELECT ` +
		`*` +
		`FROM public.gorp_migrations LIMIT $1 OFFSET $2`

	q, err := serviceImpl.DB.Query(sqlstr, limit, offset)
	if err != nil {
		return nil, err
	}
	defer q.Close()

	// load results
	var res []*GorpMigration
	for q.Next() {
		gm := GorpMigration{}

		// scan
		err = q.Scan(&gm.ID, &gm.AppliedAt)
		if err != nil {
			return nil, err
		}

		res = append(res, &gm)
	}

	return res, nil
}

// GorpMigrationByID retrieves a row from 'public.gorp_migrations' as a GorpMigration.
//
// Generated from index 'gorp_migrations_pkey'.
func GorpMigrationByID(db XODB, id string) (*GorpMigration, error) {
	var err error

	// sql query
	const sqlstr = `SELECT ` +
		`id, applied_at ` +
		`FROM public.gorp_migrations ` +
		`WHERE id = $1`

	// run query
	XOLog(sqlstr, id)
	gm := GorpMigration{
		_exists: true,
	}

	err = db.QueryRow(sqlstr, id).Scan(&gm.ID, &gm.AppliedAt)
	if err != nil {
		return nil, err
	}

	return &gm, nil
}
