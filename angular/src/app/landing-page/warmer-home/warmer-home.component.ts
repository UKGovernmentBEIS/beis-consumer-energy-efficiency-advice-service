import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-warmer-home',
    templateUrl: './warmer-home.component.html',
    styleUrls: ['./warmer-home.component.scss']
})
export class WarmerHomeComponent {
    warmerHomeJourneyType: UserJourneyType = UserJourneyType.MakeHomeWarmer;

    video: Video = {
        title: 'How to control your heating',
        synopsis: `
            An introduction to setting heating controls effectively, including:
            <ul>
                <li>
                    How heating controls can help you keep warm while also keeping your fuel bills down,
                    including when you might want them to turn on and off, and how to decide what temperature to set them to
                </li>
                <li>
                    The different elements in any heating control system, and how they can be used, including programmers,
                    room thermostats, radiator thermostats and hot water controls
                </li>
                <li>
                    A quick run through different heating control systems, including:
                    <ul>
                        <li>
                            Programmable thermostats (where you set different temperatures for different times of day)
                        </li>
                        <li>
                            Programmer with room thermostat (where you set the times with one box, and set the temperature
                            with a dial somewhere else)
                        </li>
                        <li>
                            Smart heating controls – systems that make decision for you, talk to your phone etc.
                        </li>
                        <li>
                            Controls for storage heawarmerters
                        </li>
                    </ul>
                </li>
            </ul
        At the end of the video, there are links to more detailed information on each type of system.`
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Loft insulation is well worth considering because if there is little or no \
                existing insulation considerable savings can be made.',
            iconClassName: 'icon-roofing'
        },
        {
            title: 'What can I do if I don\'t have cavity walls or a loft?',
            summary: 'There is plenty you can do to improve the insulation in your home if you \
            don\'t have cavity walls or a loft space.',
            iconClassName: 'icon-walls'
        },
    ];
}
