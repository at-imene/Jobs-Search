import React, { useCallback, useState } from 'react'
import { Card, Badge, Button, Collapse } from 'react-bootstrap'
import l1 from '../img/l1.jpg'

export default function Job({ job }) {

    const [open, setOpen] = useState(false)
    const handleClick = useCallback(
        () => {
            setOpen(open => !open)
        },
        [],
    )

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-md-flex justify-content-between">
                    <div>
                        <Card.Title>{job.title} - <span className="text-muted font-weight-light mb-3">{job.company_name}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-3">{new Date(job.date_posted).toLocaleDateString()}
                        </Card.Subtitle>
                    </div>
                    <img height="70" src={l1} className="d-none d-md-block" />
                </div>

                <Badge className="bg-primary">{job.location}</Badge>
                <Badge className="bg-secondary mx-2" >{job.source}</Badge>

                <Card.Text className="my-3">

                    {job.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ad maxime error unde quis dolorem nisi quae culpa quod eligendi quisquam, explicabo non minus blanditiis quasi ipsum distinctio? Accusantium, possimus?

                </Card.Text>

                <Button onClick={handleClick}> {open ? 'Hide details' : 'show details'}</Button>
                <Collapse in={open}>
                    <div className="mt-3">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt aliquam excepturi impedit eaque nostrum tempore repellat blanditiis delectus commodi, at veritatis, animi odit numquam nemo reprehenderit eum porro. Aperiam, quod.</p>
                        For more details visite this link: <a href={job.detail_url} rel="noreferrer" target="_blank"> {job.detail_url}</a>
                    </div>
                </Collapse>




            </Card.Body>
        </Card>
    )
}
